import { createHash, randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { analyzePost } from "@/lib/ai/analyzePost";
import { getRateLimitProvider } from "@/lib/rate-limit";
import { trackEvent } from "@/lib/analytics";

export const runtime = "nodejs";

const PLATFORMS = ["Instagram", "TikTok", "Facebook", "X", "LinkedIn", "Pinterest"];
const GOALS = ["More followers", "More views", "More comments", "Build my brand", "Sell something"];
const TONES = ["Casual", "Bold", "Professional", "Funny", "Inspirational", "Minimal"];

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_IMAGE_BYTES = 8 * 1024 * 1024;

function validateSelections(platform: string, goal: string, tone: string) {
  return (
    PLATFORMS.includes(platform) &&
    GOALS.includes(goal) &&
    TONES.includes(tone)
  );
}

function getClientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const salt = process.env.RATE_LIMIT_SALT || "post-doctor-beta";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

function rateLimitHeaders(limit: number, remaining: number, resetAt: number) {
  return {
    "X-RateLimit-Limit": String(limit),
    "X-RateLimit-Remaining": String(remaining),
    "X-RateLimit-Reset": String(Math.floor(resetAt / 1000)),
  };
}

export async function POST(request: Request) {
  const requestId = randomUUID();
  const startedAt = Date.now();

  const provider = getRateLimitProvider();
  const rate = await provider.check(getClientKey(request));
  const headers = rateLimitHeaders(rate.limit, rate.remaining, rate.resetAt);

  if (!rate.allowed) {
    const retryAfter = Math.max(
      1,
      Math.ceil((rate.resetAt - Date.now()) / 1000)
    );

    await trackEvent({
      name: "analysis_rate_limited",
      requestId,
      statusCode: 429,
    });

    return NextResponse.json(
      {
        error:
          "You’ve reached the Post Doctor beta limit. Please try again later.",
        retryAfter,
      },
      {
        status: 429,
        headers: {
          ...headers,
          "Retry-After": String(retryAfter),
        },
      }
    );
  }

  let mode: "image" | "description" | undefined;
  let platform = "";
  let goal = "";
  let tone = "";

  try {
    const contentType = request.headers.get("content-type") || "";

    let description = "";
    let imageDataUrl: string | undefined;

    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();

      description = String(form.get("description") || "").trim();
      platform = String(form.get("platform") || "");
      goal = String(form.get("goal") || "");
      tone = String(form.get("tone") || "");

      const image = form.get("image");

      if (image instanceof File && image.size > 0) {
        mode = "image";

        if (!ALLOWED_TYPES.has(image.type)) {
          return NextResponse.json(
            { error: "Please upload a JPG, PNG, or WEBP image." },
            { status: 400, headers }
          );
        }

        if (image.size > MAX_IMAGE_BYTES) {
          return NextResponse.json(
            { error: "Image is too large. Please use an image under 8 MB." },
            { status: 400, headers }
          );
        }

        const bytes = Buffer.from(await image.arrayBuffer());
        imageDataUrl = `data:${image.type};base64,${bytes.toString("base64")}`;
      }
    } else if (contentType.includes("application/json")) {
      mode = "description";

      const body = await request.json();

      description =
        typeof body.description === "string" ? body.description.trim() : "";
      platform = String(body.platform || "");
      goal = String(body.goal || "");
      tone = String(body.tone || "");
    } else {
      return NextResponse.json(
        { error: "Unsupported request type." },
        { status: 415, headers }
      );
    }

    if (!validateSelections(platform, goal, tone)) {
      return NextResponse.json(
        { error: "Please check your platform, goal, and tone selections." },
        { status: 400, headers }
      );
    }

    if (!imageDataUrl && (description.length < 8 || description.length > 700)) {
      return NextResponse.json(
        { error: "Please add a short post description." },
        { status: 400, headers }
      );
    }

    if (description.length > 700) {
      return NextResponse.json(
        { error: "Description must be 700 characters or fewer." },
        { status: 400, headers }
      );
    }

    await trackEvent({
      name: "analysis_started",
      requestId,
      mode,
      platform,
      goal,
      tone,
    });

    const report = await analyzePost({
      description: description || undefined,
      imageDataUrl,
      platform,
      goal,
      tone,
    });

    await trackEvent({
      name: "analysis_completed",
      requestId,
      mode,
      platform,
      goal,
      tone,
      durationMs: Date.now() - startedAt,
      statusCode: 200,
    });

    return NextResponse.json(
      {
        report,
        requestId,
        usage: {
          remaining: rate.remaining,
          resetAt: rate.resetAt,
        },
      },
      { headers }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to analyze this post.";

    console.error(`[Post Doctor ${requestId}] analysis failed:`, error);

    await trackEvent({
      name: "analysis_failed",
      requestId,
      mode,
      platform,
      goal,
      tone,
      durationMs: Date.now() - startedAt,
      statusCode: 500,
      errorType: error instanceof Error ? error.name : "UnknownError",
    });

    if (message.includes("OPENAI_API_KEY")) {
      return NextResponse.json(
        { error: "Post Doctor AI is not configured yet.", requestId },
        { status: 503, headers }
      );
    }

    if (process.env.NODE_ENV !== "production") {
      return NextResponse.json(
        {
          error: `Post Doctor dev error: ${message}`,
          requestId,
        },
        { status: 500, headers }
      );
    }

    return NextResponse.json(
      {
        error: "Post Doctor could not analyze this post. Please try again.",
        requestId,
      },
      { status: 500, headers }
    );
  }
}
