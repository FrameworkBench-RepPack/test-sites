#!/usr/bin/env node

import { parseArgs } from "node:util";
import { DEFAULT_PORT, serveSites } from "./lib/serveSite";

const { values: args } = parseArgs({
  options: {
    port: { type: "string", short: "p", default: String(DEFAULT_PORT) },
    site: { type: "string", short: "s" },
  },
});

if (!args.site) {
  throw new Error("❌ You must provide a site name.");
}

await serveSites({ log: true, site: args.site, port: Number(args.port) });
