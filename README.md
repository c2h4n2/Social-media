# Post Doctor v6 — Deployment Layer

V6 keeps the working MVP intact and adds deployment/readiness infrastructure.

## New in v6

- Central environment validation
- `/api/health` health check
- Swappable `RateLimitProvider` interface
- Structured, privacy-conscious server analytics
- Request IDs returned on successful and failed analyses
- Environment preflight script
- Production build check
- Deployment checklist

## Apply

Commit v5:

```bash
git add .
git commit -m "Post Doctor public beta protection"
git push
```

Then extract v6:

```bash
unzip -o post-doctor-website-v6-deployment.zip
npm install
```

Keep your existing `.env.local`.

Add if missing:

```env
POST_DOCTOR_ANALYTICS=true
```

Run:

```bash
npm run dev
```

Test:

```text
http://localhost:3000/api/health
```

You should receive `status: ok`.

## Before actual deployment

Read:

```text
DEPLOYMENT.md
```

Then run:

```bash
npm run check
```

The next step after v6 is not more application features: deploy a private
preview, test on real phones, and then replace the memory limiter with a durable
shared provider before wider public traffic.
