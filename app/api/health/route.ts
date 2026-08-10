import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const hasKey = Boolean(process.env.OPENAI_API_KEY?.trim());
  const hasSalt = Boolean(process.env.RATE_LIMIT_SALT?.trim());

  const healthy = hasKey && hasSalt;

  return NextResponse.json(
    {
      status: healthy ? "ok" : "misconfigured",
      version: "v6",
      checks: {
        openaiConfigured: hasKey,
        rateLimitSaltConfigured: hasSalt,
        siteUrlConfigured: Boolean(process.env.NEXT_PUBLIC_SITE_URL?.trim()),
      },
      timestamp: new Date().toISOString(),
    },
    {
      status: healthy ? 200 : 503,
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
