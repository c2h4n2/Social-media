# Post Doctor Deployment Checklist

## Required environment variables

Set these in the deployment platform's environment settings:

```env
OPENAI_API_KEY=...
OPENAI_MODEL=gpt-5.4-mini
NEXT_PUBLIC_SITE_URL=https://your-domain.example
RATE_LIMIT_SALT=long-random-secret
POST_DOCTOR_ANALYTICS=true
```

Do not deploy `.env.local`.

## Before deployment

Run:

```bash
npm install
npm run check
```

`npm run check` validates required environment variables and performs a
production build.

## Health check

After deployment, open:

```text
/api/health
```

Expected:

```json
{
  "status": "ok",
  "version": "v6"
}
```

The health endpoint never returns your API key or rate-limit salt.

## Analytics

V6 writes privacy-conscious structured events to the server logs:

- analysis_started
- analysis_completed
- analysis_failed
- analysis_rate_limited

Events do NOT include:
- uploaded image data
- post descriptions
- model responses
- API keys
- raw IP addresses

This gives us useful beta signals without introducing a third-party analytics
dependency yet.

## Durable rate limiting

V6 introduces a `RateLimitProvider` interface.

Current provider:
- `MemoryRateLimitProvider`

Before larger public traffic, implement a durable provider and change only:

```ts
getRateLimitProvider()
```

The API route already depends on the interface and should not need to change.

## Production test checklist

1. `/api/health` returns 200.
2. Description analysis works.
3. Image analysis works.
4. Invalid image formats are rejected.
5. Oversized images are rejected.
6. 5/hour limit triggers a 429.
7. Privacy and Terms pages load.
8. `robots.txt` loads.
9. `sitemap.xml` loads.
10. Server logs show structured PostDoctorAnalytics events.
