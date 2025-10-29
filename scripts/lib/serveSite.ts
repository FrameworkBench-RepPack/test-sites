import path from "node:path";
import Fastify, { type FastifyInstance } from "fastify";
import fastifyStatic from "@fastify/static";
import { topDistFolder } from "./dirs";

export const DEFAULT_PORT = 3000;

export type ServeOptions = {
  log: boolean;
  site: string;
  port?: number;
};

export async function serveSites(
  options: ServeOptions,
): Promise<FastifyInstance> {
  const log = options.log ? console.log : () => {};

  const port = options.port ?? DEFAULT_PORT;

  const siteFolder = path.join(topDistFolder, options.site);

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
    root: siteFolder,
    prefix: "/",
    index: ["index.html"],
  });

  await fastify.listen({ port: Number(port) });
  log(`Serving ${options.site} at http://localhost:${port}`);

  return fastify;
}
