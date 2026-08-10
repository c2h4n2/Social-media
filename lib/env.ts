type RuntimeEnv = {
  openaiApiKey: string;
  openaiModel: string;
  siteUrl: string;
  rateLimitSalt: string;
  analyticsEnabled: boolean;
  rateLimitBackend: "memory";
};

function requireValue(name: string, value: string | undefined) {
  if (!value?.trim()) {
    throw new Error(`${name} is required.`);
  }
  return value.trim();
}

export function getRuntimeEnv(): RuntimeEnv {
  const isProduction = process.env.NODE_ENV === "production";

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";

  if (isProduction && siteUrl.includes("localhost")) {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL must use the deployed URL in production."
    );
  }

  return {
    openaiApiKey: requireValue(
      "OPENAI_API_KEY",
      process.env.OPENAI_API_KEY
    ),
    openaiModel:
      process.env.OPENAI_MODEL?.trim() || "gpt-5.4-mini",
    siteUrl,
    rateLimitSalt: requireValue(
      "RATE_LIMIT_SALT",
      process.env.RATE_LIMIT_SALT
    ),
    analyticsEnabled:
      (process.env.POST_DOCTOR_ANALYTICS || "true").toLowerCase() === "true",
    rateLimitBackend: "memory",
  };
}
