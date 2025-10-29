#!/usr/bin/env node

import { join } from "node:path";
import fs from "fs-extra";
import { execa } from "execa";
import { sitesFolder, topDistFolder, topLevelFolder } from "./lib/dirs.ts";
import { getSites } from "./lib/getSites.ts";

console.log("\nPreparing to build...");
await fs.emptyDir(topDistFolder);

const siteFolders = await getSites();

for (const folderName of siteFolders) {
  const sitePath = join(sitesFolder, folderName);
  const siteDistDir = join(sitePath, "dist");
  const destDistDir = join(topDistFolder, folderName);

  console.log(`\nBuilding ${folderName}...`);
  await fs.remove(siteDistDir);

  try {
    await execa("npm", ["run", "build", "-w", folderName], {
      stdio: "inherit",
      cwd: topLevelFolder,
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
