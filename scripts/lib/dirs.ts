import { join } from "node:path";

export const topLevelFolder = join(import.meta.dirname, "..", "..");
export const sitesFolder = join(topLevelFolder, "sites");
export const topDistFolder = join(topLevelFolder, "dist");
