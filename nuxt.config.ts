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
    "dayjs-nuxt",
    "@pinia/nuxt",
    "nuxt-typed-router",
    "@morev/vue-transitions/nuxt",
    "@vueuse/nuxt",
    "nuxt-lodash",
  ],
  plugins: ["~/plugins/logger"],
  supabase: {
    redirect: true,
    redirectOptions: {
      login: "/auth/login",
      callback: "/auth/confirm",
    },
  },
  dayjs: {
    locales: ["en", "fa"],
    plugins: ["relativeTime", "utc", "timezone", "isLeapYear"],
    defaultLocale: "fa",
    defaultTimezone: "Asia/Tehran",
  },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  },
});