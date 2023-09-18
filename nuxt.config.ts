// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      VUE_APP_MAP_API_KEY: process.env.VUE_APP_MAP_API_KEY,
      VUE_APP_API_KEY: process.env.VUE_APP_API_KEY,
    },
  },

  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
});
