#!/usr/bin/env node

import path from "node:path";
import { parseArgs } from "node:util";
import Fastify from "fastify";
import fastifyStatic from "@fastify/static";

const { values: args } = parseArgs({
  options: {
    port: { type: "string", short: "p", default: "3000" },
    site: { type: "string", short: "s" },
  },
});

if (!args.site) {
  throw new Error("❌ You must provide a site name.");
}

const sitePath = path.join(import.meta.dirname, "..", "dist", args.site);

const fastify = Fastify();

fastify.addHook("onSend", async (request, reply, payload) => {
  reply.header("Cross-Origin-Resource-Policy", "same-origin");
  reply.header("Cross-Origin-Embedder-Policy", "require-corp");
  reply.header("Cross-Origin-Opener-Policy", "same-origin");
  reply.header("X-Frame-Options", "DENY");
  reply.header("X-Content-Type-Options", "nosniff");
  return payload;
});

fastify.setNotFoundHandler(async (request, reply) => {
  return reply.sendFile("index.html");
});

fastify.register(fastifyStatic, {
  root: sitePath,
  prefix: "/",
  index: ["index.html"],
});

await fastify.listen({ port: Number(args.port) });
console.log(`Serving ${args.site} at http://localhost:${args.port}`);
