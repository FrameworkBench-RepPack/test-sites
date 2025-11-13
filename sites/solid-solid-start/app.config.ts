import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  ssr: true,
  server: {
    compressPublicAssets: false,
    prerender: {
      crawlLinks: true,
    },
    output: {
      dir: ".",
      publicDir: "dist",
      serverDir: ".discard",
    },
  },
});
