#!/usr/bin/env node

import path from "node:path";
import fs from "fs-extra";
import { execa } from "execa";

const topLevelDir = path.join(import.meta.dirname, "..");
const sitesDir = path.join(topLevelDir, "sites");
const topDistDir = path.join(topLevelDir, "dist");

console.log("\nPreparing to build...");
await fs.emptyDir(topDistDir);

const siteFolders = (await fs.readdir(sitesDir)).filter(async (name) => {
  const fullPath = path.join(sitesDir, name);
  return (await fs.stat(fullPath)).isDirectory();
});

for (const folderName of siteFolders) {
  const sitePath = path.join(sitesDir, folderName);
  const siteDistDir = path.join(sitePath, "dist");
  const destDistDir = path.join(topDistDir, folderName);

  console.log(`\nBuilding ${folderName}...`);
  await fs.remove(siteDistDir);

  try {
    await execa("npm", ["run", "build", "-w", folderName], {
      stdio: "inherit",
      cwd: topLevelDir,
    });
  } catch (err) {
    throw new Error(`❌ Build failed for ${folderName}:`, { cause: err });
  }

  await fs.emptyDir(destDistDir);

  if (await fs.pathExists(siteDistDir)) {
    await fs.copy(siteDistDir, destDistDir);
  } else {
    throw new Error(`❌ No build output found for ${folderName}`);
  }
}

console.log("\n✅ All builds completed successfully!");
