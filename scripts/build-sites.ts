#!/usr/bin/env node

import { buildSites } from "./lib/buildSites.ts";

await buildSites({ log: true });
