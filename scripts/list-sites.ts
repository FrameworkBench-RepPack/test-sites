#!/usr/bin/env node

import { getSites } from "./lib/listSites.ts";

console.log("\nSites:");

for (const siteFolder of await getSites()) {
  console.log(siteFolder);
}
