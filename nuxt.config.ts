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
  ],
  plugins: ["~/plugins/logger"],
  supabase: {
    redirect: false,
    redirectOptions: {
      login: "/auth/login",
      callback: "/",
    },
  },
  ui: {},
  dayjs: {
    locales: ["en", "fa"],
    plugins: ["relativeTime", "utc", "timezone", "isLeapYear"],
    defaultLocale: "fa",
    defaultTimezone: "America/New_York",
  },
});
