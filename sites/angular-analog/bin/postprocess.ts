#!/usr/bin/env node

import fs from "fs-extra";
import path from "path";

const distDir = path.join(import.meta.dirname, "..", "dist");
const analogDir = path.join(distDir, "analog");
const publicDir = path.join(analogDir, "public");

console.log("Running postprocess steps to make file structure conformant..");

if (await fs.pathExists(publicDir)) {
  await fs.copy(publicDir, distDir, { overwrite: true });
  await fs.remove(analogDir);
} else {
  throw new Error(
    "❌ No 'analog/public' folder found, maybe the postprocessing step has already been executed?",
  );
}

console.log("✅ Output was succesfully transformed.");
