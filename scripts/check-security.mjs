import { execSync } from "node:child_process";
import fs from "node:fs";

const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
const nextVersion = pkg.dependencies?.next;

if (nextVersion !== "15.4.11") {
  console.error(`Expected next@15.4.11, found ${nextVersion || "missing"}`);
  process.exit(1);
}

console.log(`Next.js pinned to patched 15.4.x release: ${nextVersion}`);

try {
  execSync("npm audit --omit=dev", { stdio: "inherit" });
} catch {
  console.error(
    "\nSecurity audit reported production dependency issues. Review before deploying."
  );
  process.exit(1);
}
