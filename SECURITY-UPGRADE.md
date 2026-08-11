# Post Doctor v6.1 — Security Upgrade

This patch keeps Post Doctor on the Next.js 15.4 release line and upgrades:

```text
next 15.4.8 → 15.4.11
```

## Apply

From the repository root:

```bash
unzip -o post-doctor-v6-1-security.zip
npm install
npm list next
npm run check
```

Expected:

```text
next@15.4.11
```

## Local regression test

```bash
npm run dev
```

Test:

1. `/api/health`
2. Describe Post
3. Upload Image
4. Privacy
5. Terms

## Commit and deploy

If all local checks pass:

```bash
git add .
git commit -m "Upgrade Next.js security patch"
git push
```

Then verify the new Vercel deployment with:

1. `/api/health`
2. Describe Post
3. Upload Image

## Next milestone

After this patch is confirmed in production, start the AdSense/advertising readiness phase.
