import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";
import path from "node:path";

export default defineConfig({
  plugins: [
    babel({
      babelConfig: { plugins: ["babel-plugin-react-compiler"] },
    }),
    reactRouter(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "app"),
    },
  },
});
