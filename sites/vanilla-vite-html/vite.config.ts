import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        "static-1": resolve(import.meta.dirname, "static-1/index.html"),
        "static-2": resolve(import.meta.dirname, "static-2/index.html"),
        live: resolve(import.meta.dirname, "live/index.html"),
        tooltips: resolve(import.meta.dirname, "tooltips/index.html"),
        faq: resolve(import.meta.dirname, "faq/index.html"),
        list: resolve(import.meta.dirname, "list/index.html"),
      },
    },
  },
});
