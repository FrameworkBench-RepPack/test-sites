#!/usr/bin/env node

import { listSites } from "./lib/listSites.ts";

console.log("\nSites:\n");

for (const siteFolder of await listSites()) {
  console.log(siteFolder);
}

console.log("");
