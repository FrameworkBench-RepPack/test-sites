#!/usr/bin/env node

import path from "node:path";
import fs from "fs-extra";
import { execa } from "execa";

const topLevelDir = path.join(import.meta.dirname, "..");
const sitesDir = path.join(topLevelDir, "sites");
const topBuildDir = path.join(topLevelDir, "build");

console.log("\nPreparing to build...");
await fs.emptyDir(topBuildDir);

const siteFolders = (await fs.readdir(sitesDir)).filter(async (name) => {
  const fullPath = path.join(sitesDir, name);
  return (await fs.stat(fullPath)).isDirectory();
});

for (const folderName of siteFolders) {
  const sitePath = path.join(sitesDir, folderName);
  const siteBuildDir = path.join(sitePath, "build");
  const destBuildDir = path.join(topBuildDir, folderName);

  console.log(`\nBuilding ${folderName}...`);
  await fs.remove(siteBuildDir);

  try {
    await execa("npm", ["run", "build", "-w", folderName], {
      stdio: "inherit",
      cwd: topLevelDir,
    });
  } catch (err) {
    throw new Error(`❌ Build failed for ${folderName}:`, { cause: err });
  }

  await fs.emptyDir(destBuildDir);

  if (await fs.pathExists(siteBuildDir)) {
    await fs.copy(siteBuildDir, destBuildDir);
  } else {
    throw new Error(`❌ No build output found for ${folderName}`);
  }
}

console.log("\n✅ All builds completed successfully!");
