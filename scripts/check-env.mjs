const required = [
  "OPENAI_API_KEY",
  "RATE_LIMIT_SALT",
  "NEXT_PUBLIC_SITE_URL",
];

const missing = required.filter((name) => !process.env[name]?.trim());

if (missing.length) {
  console.error(`Missing required environment variables: ${missing.join(", ")}`);
  process.exit(1);
}

if (
  process.env.NODE_ENV === "production" &&
  process.env.NEXT_PUBLIC_SITE_URL.includes("localhost")
) {
  console.error(
    "NEXT_PUBLIC_SITE_URL cannot point to localhost in production."
  );
  process.exit(1);
}

console.log("Post Doctor environment check passed.");
