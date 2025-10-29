import { join } from "node:path";
import fs from "fs-extra";
import { sitesFolder } from "./dirs.ts";

let sites: string[] | undefined;

export async function listSites(): Promise<string[]> {
  sites ??= (await fs.readdir(sitesFolder)).filter(async (name) => {
    const fullPath = join(sitesFolder, name);
    return (await fs.stat(fullPath)).isDirectory();
  });
  return sites;
}
