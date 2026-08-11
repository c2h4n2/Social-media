# Post Doctor — AdSense Setup

V6.2 is AdSense-ready but does not enable ads until you add a real AdSense
publisher/client ID.

## What is included

- Conditional site-wide AdSense loader
- `/ads.txt` route
- About page
- How It Works page
- Advertising/cookie language added to Privacy
- Updated sitemap
- No empty ad placeholders before AdSense is enabled

## Step 1 — Apply locally

```bash
unzip -o post-doctor-v6-2-adsense-ready.zip
npm install
npm run check
npm run dev
```

Check:

```text
/about
/how-it-works
/privacy
/ads.txt
```

Until AdSense is configured, `/ads.txt` intentionally says the publisher ID is
not configured yet.

## Step 2 — Commit and deploy

```bash
git add .
git commit -m "Prepare Post Doctor for AdSense"
git push
```

Wait for Vercel to deploy and re-test the pages.

## Step 3 — Create or use your AdSense account

In AdSense, add the production Post Doctor site.

Google will give you a client/publisher ID in a format similar to:

```text
ca-pub-1234567890123456
```

Do not invent this value.

## Step 4 — Add the Vercel environment variable

Add:

```env
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-YOUR_REAL_ID
```

Then redeploy.

The site will automatically:

1. load the AdSense script across pages
2. expose an `ads.txt` entry at `/ads.txt`

## Step 5 — AdSense review and Auto ads

After the site is added and the code is detected, submit it for review in
AdSense. Once approved, Auto ads can be enabled from the AdSense interface.

## Consent

For EEA, UK, and Switzerland traffic, Google requires a certified consent
management platform (CMP) when serving personalized ads. Google provides its
own Privacy & messaging CMP inside AdSense, which is the simplest starting
option for Post Doctor.

Do not add a custom home-grown consent banner and assume it satisfies Google's
certified CMP requirement.
