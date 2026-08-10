import OpenAI from "openai";
import type { PostDoctorReport } from "@/lib/post-doctor";
import { getRuntimeEnv } from "@/lib/env";

function getClient() {
  const env = getRuntimeEnv();

  return {
    env,
    client: new OpenAI({
      apiKey: env.openaiApiKey,
    }),
  };
}

type AnalyzePostInput = {
  description?: string;
  imageDataUrl?: string;
  platform: string;
  goal: string;
  tone: string;
};

const SYSTEM_PROMPT = `
You are Post Doctor, an expert social-media content editor.

Improve the user's planned social post before it is published.
Be practical, specific, natural, and platform-aware.
Do not promise virality, followers, reach, sales, or algorithmic outcomes.

If an image is provided:
- Analyze only what is visibly present.
- Do not identify real people.
- Do not infer sensitive personal attributes.
- Do not invent location, ownership, relationships, brands, or backstory unless
  they are clearly stated in the optional user description.
- Give visual feedback that is useful for social posting: framing, focal point,
  clutter, readability, crop potential, caption/visual alignment, and likely
  attention flow.
- If image quality or content cannot be judged confidently, say so briefly.

Return ONLY valid JSON with exactly this shape:

{
  "summary": "short sentence",
  "captions": ["caption 1", "caption 2", "caption 3"],
  "hook": "single hook",
  "cta": "single CTA",
  "keywords": ["keyword 1", "keyword 2", "keyword 3", "keyword 4"],
  "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4"],
  "strengths": ["strength 1", "strength 2"],
  "improvements": ["improvement 1", "improvement 2"],
  "scores": {
    "hook": 0,
    "caption": 0,
    "platformFit": 0,
    "cta": 0,
    "engagement": 0,
    "visualAlignment": 0,
    "total": 0
  }
}

Scoring limits:
- hook: 0-20
- caption: 0-20
- platformFit: 0-15
- cta: 0-15
- engagement: 0-15
- visualAlignment: 0-15
- total must equal the sum of the six categories

Return exactly three substantially different caption options.
Do not invent details that are not supported by the description or image.
`;

function validateReport(value: unknown): PostDoctorReport {
  if (!value || typeof value !== "object") {
    throw new Error("AI returned an invalid report.");
  }

  const r = value as Record<string, any>;

  for (const key of ["summary", "hook", "cta"]) {
    if (typeof r[key] !== "string" || !r[key].trim()) {
      throw new Error(`AI report missing ${key}.`);
    }
  }

  for (const key of ["captions", "keywords", "hashtags", "strengths", "improvements"]) {
    if (!Array.isArray(r[key]) || r[key].some((v: unknown) => typeof v !== "string")) {
      throw new Error(`AI report has invalid ${key}.`);
    }
  }

  if (r.captions.length !== 3) {
    throw new Error("AI report must contain exactly 3 captions.");
  }

  const s = r.scores;
  if (!s || typeof s !== "object") {
    throw new Error("AI report missing scores.");
  }

  const limits: Record<string, number> = {
    hook: 20,
    caption: 20,
    platformFit: 15,
    cta: 15,
    engagement: 15,
    visualAlignment: 15,
  };

  for (const [key, max] of Object.entries(limits)) {
    if (!Number.isInteger(s[key]) || s[key] < 0 || s[key] > max) {
      throw new Error(`AI score ${key} is invalid.`);
    }
  }

  const total =
    s.hook +
    s.caption +
    s.platformFit +
    s.cta +
    s.engagement +
    s.visualAlignment;

  return {
    summary: r.summary,
    captions: r.captions,
    hook: r.hook,
    cta: r.cta,
    keywords: r.keywords,
    hashtags: r.hashtags,
    strengths: r.strengths,
    improvements: r.improvements,
    scores: {
      hook: s.hook,
      caption: s.caption,
      platformFit: s.platformFit,
      cta: s.cta,
      engagement: s.engagement,
      visualAlignment: s.visualAlignment,
      total,
    },
  };
}

export async function analyzePost(input: AnalyzePostInput): Promise<PostDoctorReport> {
  const { client, env } = getClient();

  const contextText = [
    `Platform: ${input.platform}`,
    `Goal: ${input.goal}`,
    `Tone: ${input.tone}`,
    "",
    input.description?.trim()
      ? `User description:\n${input.description.trim()}`
      : "No additional description was provided.",
    "",
    input.imageDataUrl
      ? "Analyze the attached image and create the Post Doctor report."
      : "Create the Post Doctor report from the description.",
  ].join("\n");

  const userContent: Array<
    | { type: "input_text"; text: string }
    | { type: "input_image"; image_url: string; detail: "auto" }
  > = [{ type: "input_text", text: contextText }];

  if (input.imageDataUrl) {
    userContent.push({
      type: "input_image",
      image_url: input.imageDataUrl,
      detail: "auto",
    });
  }

  const response = await client.responses.create({
    model: env.openaiModel,
    instructions: SYSTEM_PROMPT,
    input: [
      {
        role: "user",
        content: userContent,
      },
    ],
  });

  const raw = response.output_text?.trim();
  if (!raw) {
    throw new Error("AI returned an empty response.");
  }

  let parsed: unknown;
  try {
    const cleaned = raw
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "");
    parsed = JSON.parse(cleaned);
  } catch {
    console.error("Raw AI output:", raw);
    throw new Error("AI returned malformed JSON.");
  }

  return validateReport(parsed);
}
