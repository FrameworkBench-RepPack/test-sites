// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-10-27",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint"],

  nitro: {
    static: true,

    output: {
      publicDir: "dist",
    },
  },

  app: {
    head: {
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          charset: "utf-8",
        },
      ],
      link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
      title: "Test site",
    },
  },
});
