# Post Doctor — GA4 Setup

This build adds Google Analytics 4.

## Environment variable

Local `.env.local`:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-Y1QHV2R0JE
```

Add the same variable in Vercel for Production and Preview.

## Events tracked

- `post_analysis_started`
- `post_analysis_completed`
- `post_analysis_failed`
- `platform_selected`

Event parameters include:

- mode
- platform
- goal
- tone
- score (successful analyses only)

The tracking helper intentionally does not send:
- image data
- post descriptions
- API keys
- raw model output

## Apply

```bash
unzip -o post-doctor-v6-3-ga4.zip
npm install
npm run check
npm run dev
```

Then open Google Analytics Realtime and use the local/deployed site.

## Commit

```bash
git add .
git commit -m "Add GA4 analytics tracking"
git push
```

After Vercel deploys, use Google's "Test installation" button or the GA4 Realtime report.
