import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact({
      prerender: {
        enabled: true,
        renderTarget: "#app",
        previewMiddlewareEnabled: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
