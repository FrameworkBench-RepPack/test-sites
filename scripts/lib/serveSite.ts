import path from "node:path";
import Fastify, { type FastifyInstance } from "fastify";
import fastifyStatic from "@fastify/static";
import fastifyCompress from "@fastify/compress";
import { topDistFolder } from "./dirs.ts";

export const DEFAULT_PORT = 3000;

export type ServeOptions = {
  site: string;
  port?: number;
};

export async function serveSites(
  options: ServeOptions,
): Promise<FastifyInstance> {
  const port = options.port ?? DEFAULT_PORT;

  const siteFolder = path.join(topDistFolder, options.site);

  const fastify = Fastify();

  fastify.addHook("onSend", async (request, reply, payload) => {
    reply.header("Cross-Origin-Resource-Policy", "same-origin");
    reply.header("Cross-Origin-Embedder-Policy", "require-corp");
    reply.header("Cross-Origin-Opener-Policy", "same-origin");
    reply.header(
      "Content-Security-Policy",
      "default-src 'none'; script-src 'self' 'unsafe-inline' data: ; connect-src 'self' data: ; style-src 'self' 'unsafe-inline' data: ; img-src 'self' data: ; frame-ancestors 'none'; object-src 'none'; base-uri 'none'; form-action 'none';",
    );
    reply.header("X-Content-Type-Options", "nosniff");
    return payload;
  });

  fastify.setNotFoundHandler(async (request, reply) => {
    return reply.sendFile("index.html");
  });

  await fastify.register(fastifyCompress);

  await fastify.register(fastifyStatic, {
    root: siteFolder,
    prefix: "/",
    index: ["index.html"],
  });

  await fastify.listen({ port: Number(port) });

  return fastify;
}
