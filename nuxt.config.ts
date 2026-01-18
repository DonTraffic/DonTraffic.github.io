// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: {
    assets: "/<rootDir>/assets",
  },

  css: [
    "@/assets/style/main.scss",
  ],

  compatibilityDate: "2025-04-12",
})