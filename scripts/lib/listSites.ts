import { join } from "node:path";
import fs from "fs-extra";
import { sitesFolder } from "./dirs.ts";

let sites: string[] | undefined;

export async function listSites(): Promise<string[]> {
  if (!sites) {
    const entries = await fs.readdir(sitesFolder);
    const dirTests = await Promise.all(
      entries.map(async (name) => {
        const fullPath = join(sitesFolder, name);
        return (await fs.stat(fullPath)).isDirectory();
      }),
    );
    sites = entries.filter((_, index: number) => dirTests[index]);
  }
  return sites;
}
