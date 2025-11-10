import { join } from "node:path";
import fs from "fs-extra";
import { execa } from "execa";
import { hashElement } from "folder-hash";
import { sitesFolder, topDistFolder, topLevelFolder } from "./dirs.ts";
import { listSites } from "./listSites.ts";

const DIST_LOCK_PATH = join(topDistFolder, "lock.json");

export type BuildOptions = {
  log: boolean;
  clean: boolean;
};

type HashEntry = { src: string; dist: string };

export async function buildSites(options: BuildOptions) {
  const log = options.log ? console.log : () => {};

  log("\nPreparing to build...");
  const siteFolders = await listSites();

  const hashes: Record<string, HashEntry> = {};
  if (options.clean) {
    log("\nAll sites will be rebuilt.");
  } else {
    try {
      const lockHashes = await fs.readJson(DIST_LOCK_PATH);
      for (const name of siteFolders) {
        if (lockHashes[name]) {
          hashes[name] = lockHashes[name];
        }
      }
    } catch {
      log("\nCould not find a valid lock file, all sites will be rebuilt.");
    }
  }

  let cachedSites = 0;

  for (const [index, folderName] of siteFolders.entries()) {
    const sitePath = join(sitesFolder, folderName);
    const siteDistDir = join(sitePath, "dist");
    const destDistDir = join(topDistFolder, folderName);

    const srcHash = (
      await hashElement(sitePath, {
        folders: { exclude: ["node_modules", "dist", ".*"] },
      })
    ).hash;

    if (srcHash === hashes[folderName]?.src) {
      await fs.ensureDir(destDistDir);
      const distHash = (await hashElement(destDistDir)).hash;
      if (distHash === hashes[folderName].dist) {
        log(
          `\nReusing cached build for ${folderName}... (${index + 1}/${siteFolders.length})`,
        );
        cachedSites++;
        continue;
      } else {
        log(`\n⚠️  Cached build for ${folderName} has been altered.`);
      }
    }

    log(`\nBuilding ${folderName}... (${index + 1}/${siteFolders.length})`);
    await fs.remove(siteDistDir);
    await fs.remove(destDistDir);

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

    const distHash = (await hashElement(destDistDir)).hash;
    hashes[folderName] = { src: srcHash, dist: distHash };
  }

  log("\nFinalizing build...");
  await fs.writeJson(DIST_LOCK_PATH, hashes, { spaces: 2 });

  log(
    `\n✅ All builds completed successfully! (built: ${siteFolders.length - cachedSites}, from cache: ${cachedSites})\n`,
  );
}
