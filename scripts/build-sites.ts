#!/usr/bin/env node

import { parseArgs } from "node:util";
import { buildSites } from "./lib/buildSites.ts";

const { values: args } = parseArgs({
  options: {
    clean: { type: "boolean", short: "c", default: false },
  },
});

await buildSites({ log: true, clean: args.clean });
