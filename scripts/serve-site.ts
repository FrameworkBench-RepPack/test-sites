#!/usr/bin/env node

import { parseArgs } from "node:util";
import { listSites } from "./lib/listSites";
import { DEFAULT_PORT, serveSites } from "./lib/serveSite";

const { values: args } = parseArgs({
  options: {
    port: { type: "string", short: "p", default: String(DEFAULT_PORT) },
    site: { type: "string", short: "s" },
  },
});

if (!args.site) {
  throw new Error("❌ You must provide a site name.");
} else if (!(await listSites()).includes(args.site)) {
  throw new Error("❌ That site does not exist.");
}

await serveSites({ log: true, site: args.site, port: Number(args.port) });

console.log(`Serving ${args.site} at http://localhost:${args.port}`);
