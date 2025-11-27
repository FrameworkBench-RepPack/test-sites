import type { Config } from "@react-router/dev/config";

export default {
  buildDirectory: "dist",
  ssr: true,
  async prerender() {
    return [
      "/",
      "/static-1",
      "/static-2",
      "/faq",
      "/list",
      "/live",
      "/tooltips",
    ];
  },
} satisfies Config;
