import { defineConfig } from "vite";
import analog from "@analogjs/platform";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    target: ["esnext"],
  },
  resolve: {
    mainFields: ["module"],
  },
  plugins: [
    analog({
      ssr: true,
      prerender: {
        routes: [
          "/",
          "/faq",
          "/list",
          "/live",
          "/static-1",
          "/static-2",
          "/tooltips",
        ],
      },
    }),
  ],
}));
