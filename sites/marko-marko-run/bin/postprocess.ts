import fs from "fs-extra";
import path from "path";

const MIN_EXPECTED_SUBPAGES = 6;

const distDir = path.join(import.meta.dirname, "..", "dist");
const publicDir = path.join(distDir, "public");

console.log("Running postprocess steps to make file structure conformant..");

// Step 1: Remove `public` top-level path
// Issue: https://github.com/marko-js/run/issues/172
if (await fs.pathExists(publicDir)) {
  await fs.copy(publicDir, distDir, { overwrite: true });
  await fs.remove(publicDir);
} else {
  throw new Error(
    "❌ No 'public' folder found, maybe the postprocessing step has already been executed?",
  );
}

let subpages = 0;

// Step 2: Move subpages to subfolders
// Issue: https://github.com/marko-js/run/issues/173
const files = await fs.readdir(distDir);
for (const file of files) {
  const filePath = path.join(distDir, file);
  const stat = await fs.stat(filePath);

  if (stat.isFile() && file.endsWith(".html") && file !== "index.html") {
    const baseName = path.basename(file, ".html");
    const folderPath = path.join(distDir, baseName);

    if (await fs.pathExists(folderPath)) {
      subpages++;
      const targetIndex = path.join(folderPath, "index.html");
      await fs.move(filePath, targetIndex, { overwrite: true });
    }
  }
}

if (subpages < MIN_EXPECTED_SUBPAGES) {
  throw new Error(
    `❌ Expected to transform at least ${MIN_EXPECTED_SUBPAGES} subpages, but only found ${subpages}.`,
  );
}

console.log("✅ Output was succesfully transformed.");
