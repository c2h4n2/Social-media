# Post Doctor v6.1 — Security Patch

Post Doctor stays on the Next.js 15.4 branch and upgrades to `15.4.11`.

Apply:

```bash
unzip -o post-doctor-v6-1-security.zip
npm install
npm list next
npm run check
```

Then run locally:

```bash
npm run dev
```

Test the health endpoint and both AI analysis modes before committing.

See `SECURITY-UPGRADE.md` for the full checklist.
