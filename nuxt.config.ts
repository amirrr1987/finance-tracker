// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@nuxt/image",
    "@nuxtjs/color-mode",
    "@nuxt/icon",
    "@nuxt/fonts",
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxtjs/supabase",
  ],
  plugins: [
    '~/plugins/logger'
  ],
  supabase: {
    redirect: false,
    redirectOptions: {
      login: "/auth/login",
      callback: '/'
    },
  },
});
