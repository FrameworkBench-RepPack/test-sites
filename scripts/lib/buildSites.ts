import { join } from "node:path";
import fs from "fs-extra";
import { execa } from "execa";
import { sitesFolder, topDistFolder, topLevelFolder } from "./dirs.ts";
import { listSites } from "./listSites.ts";

export type BuildOptions = {
  log: boolean;
};

export async function buildSites(options: BuildOptions) {
  const log = options.log ? console.log : () => {};

  log("\nPreparing to build...");
  await fs.emptyDir(topDistFolder);

  const siteFolders = await listSites();

  for (const [index, folderName] of siteFolders.entries()) {
    const sitePath = join(sitesFolder, folderName);
    const siteDistDir = join(sitePath, "dist");
    const destDistDir = join(topDistFolder, folderName);

    log(`\nBuilding ${folderName}... (${index + 1}/${siteFolders.length})`);
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

  log("\n✅ All builds completed successfully!");
}
