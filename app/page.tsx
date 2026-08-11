"use client";

import { ChangeEvent, useMemo, useRef, useState } from "react";
import type { PostDoctorReport } from "@/lib/post-doctor";

type Platform = "Instagram" | "TikTok" | "Facebook" | "X" | "LinkedIn" | "Pinterest";
type Goal = "More followers" | "More views" | "More comments" | "Build my brand" | "Sell something";
type Tone = "Casual" | "Bold" | "Professional" | "Funny" | "Inspirational" | "Minimal";

const platforms: Platform[] = ["Instagram", "TikTok", "Facebook", "X", "LinkedIn", "Pinterest"];
const goals: Goal[] = ["More followers", "More views", "More comments", "Build my brand", "Sell something"];
const tones: Tone[] = ["Casual", "Bold", "Professional", "Funny", "Inspirational", "Minimal"];

export default function Home() {
  const [mode, setMode] = useState<"upload" | "describe">("upload");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageName, setImageName] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [description, setDescription] = useState("");
  const [platform, setPlatform] = useState<Platform>("Instagram");
  const [goal, setGoal] = useState<Goal>("More followers");
  const [tone, setTone] = useState<Tone>("Casual");
  const [report, setReport] = useState<PostDoctorReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState("");
  const [error, setError] = useState("");
  const [usageRemaining, setUsageRemaining] = useState<number | null>(null);
  const [requestId, setRequestId] = useState("");
  const resultsRef = useRef<HTMLDivElement>(null);

  const ready = useMemo(() => {
    if (mode === "upload") return Boolean(imageFile);
    return description.trim().length >= 8;
  }, [mode, imageFile, description]);

  function handleImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setError("");

    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      setImageFile(null);
      setImageName("");
      setError("Please choose a JPG, PNG, or WEBP image.");
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setImageFile(null);
      setImageName("");
      setError("Image is too large. Please choose an image under 8 MB.");
      return;
    }

    if (previewUrl) URL.revokeObjectURL(previewUrl);

    setImageFile(file);
    setImageName(file.name);
    setPreviewUrl(URL.createObjectURL(file));
  }

  async function examinePost() {
    if (!ready || loading) return;

    setLoading(true);
    setError("");
    setReport(null);

    try {
      let response: Response;

      if (mode === "upload") {
        const form = new FormData();
        if (imageFile) form.append("image", imageFile);
        form.append("description", description);
        form.append("platform", platform);
        form.append("goal", goal);
        form.append("tone", tone);

        response = await fetch("/api/analyze-post", {
          method: "POST",
          body: form,
        });
      } else {
        response = await fetch("/api/analyze-post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ description, platform, goal, tone }),
        });
      }

      const data = await response.json();

      if (!response.ok) {
        setRequestId(data.requestId || "");
        throw new Error(data.error || "Unable to analyze your post.");
      }

      setRequestId(data.requestId || "");
      setReport(data.report);
      if (typeof data.usage?.remaining === "number") {
        setUsageRemaining(data.usage.remaining);
      }

      setTimeout(
        () => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
        80
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to analyze your post.");
    } finally {
      setLoading(false);
    }
  }

  async function copyText(label: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      setTimeout(() => setCopied(""), 1400);
    } catch {
      setCopied("");
    }
  }

  function resetAnalyzer() {
    setReport(null);
    setError("");
    setCopied("");
    setImageFile(null);
    setImageName("");
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl("");
    setDescription("");
    setUsageRemaining(null);
    setRequestId("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const fullPost = report
    ? [report.hook, report.captions[0], report.cta, report.hashtags.join(" ")].join("\n\n")
    : "";

  return (
    <main className="shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="Post Doctor home">
          <img
            className="brandLogo"
            src="/post-doctor-logo.png"
            alt=""
            aria-hidden="true"
          />
          <span>Post Doctor</span>
        </a>
        <span className="beta">BETA</span>
      </header>

      <section className="hero">
        <img
          className="heroBrandLogo"
          src="/post-doctor-logo.png"
          alt="Post Doctor — Better posts. Bigger impact."
        />
        <div className="eyebrow">AI SOCIAL MEDIA ASSISTANT</div>
        <h1>Make your post better <span>before</span> you publish it.</h1>
        <p>
          Upload the photo you want to post or describe your idea. Post Doctor
          examines it and builds a tailored posting package.
        </p>
      </section>

      <section className="card analyzerCard">
        <div className="modeTabs" role="tablist">
          <button
            className={mode === "upload" ? "tab active" : "tab"}
            onClick={() => { setMode("upload"); setError(""); setReport(null); }}
            type="button"
          >
            Upload image
          </button>
          <button
            className={mode === "describe" ? "tab active" : "tab"}
            onClick={() => { setMode("describe"); setError(""); setReport(null); }}
            type="button"
          >
            Describe post
          </button>
        </div>

        {mode === "upload" ? (
          <>
            <label className={previewUrl ? "uploadZone hasImage" : "uploadZone"}>
              {previewUrl ? (
                <>
                  <img src={previewUrl} alt="Selected post preview" />
                  <div className="uploadOverlay">
                    <strong>Tap to change image</strong>
                    <span>{imageName}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="uploadIcon">↥</div>
                  <strong>Choose a photo</strong>
                  <span>JPG, PNG or WEBP · up to 8 MB</span>
                </>
              )}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImage}
              />
            </label>

            <div className="fieldBlock optionalDescription">
              <label htmlFor="image-description">
                Add context <span className="optionalLabel">OPTIONAL</span>
              </label>
              <textarea
                id="image-description"
                rows={4}
                maxLength={700}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Example: This is my first car. I want the post to feel proud but not show-offy."
              />
              <span className="counter">{description.length}/700</span>
            </div>
          </>
        ) : (
          <div className="fieldBlock">
            <label htmlFor="description">What are you planning to post?</label>
            <textarea
              id="description"
              rows={6}
              maxLength={700}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Example: A photo of my black Mustang at sunset. It's my first car and I want the post to feel proud and confident without sounding show-offy."
            />
            <span className="counter">{description.length}/700</span>
          </div>
        )}

        <div className="selectorGrid">
          <SelectField label="Platform" value={platform} onChange={(v) => setPlatform(v as Platform)} options={platforms} />
          <SelectField label="Goal" value={goal} onChange={(v) => setGoal(v as Goal)} options={goals} />
          <SelectField label="Tone" value={tone} onChange={(v) => setTone(v as Tone)} options={tones} />
        </div>

        <button
          className="primaryButton"
          type="button"
          onClick={examinePost}
          disabled={!ready || loading}
        >
          <span className="stethoscope">⌁</span>
          {loading ? "Examining your post..." : "Examine my post"}
        </button>

        {!ready && !loading && (
          <p className="helper">
            {mode === "upload"
              ? "Choose an image to continue."
              : "Add a short description to continue."}
          </p>
        )}

        {error && (
          <div className="errorBox" role="alert">
            <div>{error}</div>
            {requestId && <small>Reference: {requestId}</small>}
          </div>
        )}

        <p className="betaLimit">
          Public beta limit: up to 5 analyses per hour per network.
        </p>
      </section>

      {loading && (
        <section className="scanCard" aria-live="polite">
          <div className="scanPulse" />
          <div>
            <strong>Post Doctor is examining your post</strong>
            <span>
              Checking the visual, hook, caption, platform fit and engagement opportunities…
            </span>
          </div>
        </section>
      )}

      <section className="trustRow">
        <div><strong>Visual-aware</strong><span>Analyzes the photo you plan to post</span></div>
        <div><strong>Context-aware</strong><span>Optional description helps personalize the copy</span></div>
        <div><strong>Mobile-ready</strong><span>Designed for creators working from phones</span></div>
      </section>

      {report && (
        <section className="results" ref={resultsRef}>
          <div className="resultsHeader">
            <div>
              <div className="eyebrow">POST DOCTOR REPORT</div>
              <h2>{report.summary}</h2>
              <p>Tailored for {platform} · {goal} · {tone}</p>
            </div>
            <ScoreRing score={report.scores.total} />
          </div>

          <ScoreBreakdown scores={report.scores} />

          <div className="resultsGrid">
            <ResultCard title="Caption options" wide>
              {report.captions.map((caption, index) => (
                <CaptionOption
                  key={`${caption}-${index}`}
                  number={String(index + 1)}
                  value={caption}
                  copied={copied}
                  onCopy={copyText}
                />
              ))}
            </ResultCard>

            <ResultCard title="Hook">
              <p className="bigCopy">“{report.hook}”</p>
            </ResultCard>

            <ResultCard title="Call to action">
              <p className="bigCopy">“{report.cta}”</p>
            </ResultCard>

            <ResultCard title="Keywords & hashtags" wide>
              <div className="chips">
                {[...report.keywords, ...report.hashtags].map((tag, index) => (
                  <span key={`${tag}-${index}`}>{tag}</span>
                ))}
              </div>
            </ResultCard>

            <ResultCard title="Doctor's notes" wide>
              <ul className="notes">
                {report.strengths.map((note, index) => (
                  <li key={`strength-${index}`}><span>✓</span>{note}</li>
                ))}
                {report.improvements.map((note, index) => (
                  <li key={`improvement-${index}`} className="improvement"><span>!</span>{note}</li>
                ))}
              </ul>
            </ResultCard>
          </div>

          <div className="resultActions">
            <button
              className="primaryButton"
              type="button"
              onClick={() => copyText("complete", fullPost)}
            >
              {copied === "complete" ? "Copied!" : "Copy complete post"}
            </button>
            <button className="secondaryButton" type="button" onClick={resetAnalyzer}>
              Analyze another
            </button>
          </div>

          {usageRemaining !== null && (
            <p className="usageNote">
              {usageRemaining} beta analysis{usageRemaining === 1 ? "" : "es"} remaining in this hourly window.
            </p>
          )}

          <p className="disclaimer">
            Post Doctor scores and suggestions are AI-generated content-quality estimates,
            not predictions of reach, engagement or virality.
          </p>
        </section>
      )}

      <footer>
        <span>© 2026 Post Doctor</span>
        <nav>
          <a href="/about">About</a>
          <a href="/how-it-works">How it works</a>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </nav>
      </footer>
    </main>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
}) {
  return (
    <label className="selectField">
      <span>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}

function ResultCard({
  title,
  children,
  wide = false,
}: {
  title: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <article className={wide ? "resultCard wide" : "resultCard"}>
      <h3>{title}</h3>
      {children}
    </article>
  );
}

function CaptionOption({
  number,
  value,
  copied,
  onCopy,
}: {
  number: string;
  value: string;
  copied: string;
  onCopy: (label: string, value: string) => void;
}) {
  const key = `caption-${number}`;
  return (
    <div className="captionOption">
      <span className="captionNumber">{number}</span>
      <p>{value}</p>
      <button type="button" onClick={() => onCopy(key, value)}>
        {copied === key ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}

function ScoreRing({ score }: { score: number }) {
  const degrees = Math.max(0, Math.min(100, score)) * 3.6;
  return (
    <div
      className="scoreRing"
      style={{
        background: `radial-gradient(circle at center, white 60%, transparent 61%), conic-gradient(var(--accent) 0deg ${degrees}deg, #e8e8ef ${degrees}deg 360deg)`
      }}
      aria-label={`Post score ${score} out of 100`}
    >
      <strong>{score}</strong>
      <span>/ 100</span>
    </div>
  );
}

function ScoreBreakdown({ scores }: { scores: PostDoctorReport["scores"] }) {
  const items = [
    ["Hook", scores.hook, 20],
    ["Caption", scores.caption, 20],
    ["Platform fit", scores.platformFit, 15],
    ["CTA", scores.cta, 15],
    ["Engagement", scores.engagement, 15],
    ["Visual alignment", scores.visualAlignment, 15],
  ] as const;

  return (
    <div className="scoreBreakdown">
      {items.map(([label, value, max]) => (
        <div className="scoreItem" key={label}>
          <div><span>{label}</span><strong>{value}/{max}</strong></div>
          <div className="scoreTrack">
            <span style={{ width: `${(value / max) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
