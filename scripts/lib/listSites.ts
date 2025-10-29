import { join } from "node:path";
import fs from "fs-extra";
import { sitesFolder } from "./dirs.ts";

export async function getSites() {
  return (await fs.readdir(sitesFolder)).filter(async (name) => {
    const fullPath = join(sitesFolder, name);
    return (await fs.stat(fullPath)).isDirectory();
  });
}
