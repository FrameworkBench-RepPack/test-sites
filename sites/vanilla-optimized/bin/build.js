#!/usr/bin/env node

import { join } from "node:path";
import fs from "fs-extra";

const topFolder = join(import.meta.dirname, "..");
const srcFolder = join(topFolder, "public");
const distFolder = join(topFolder, "dist");

await fs.emptyDir(distFolder);

await fs.copy(srcFolder, distFolder);
