import ConsoleLogAdvanced from "console-log-advanced";
export default defineNuxtPlugin({
  name: "clg",
  parallel: true,
  setup(nuxtApp) {
    const clg = new ConsoleLogAdvanced({ isDevelopMode: true });
    nuxtApp.provide("clg", clg);
  },
});
