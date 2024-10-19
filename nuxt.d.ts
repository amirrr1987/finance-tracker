import type { ConsoleLogAdvanced } from "console-log-advanced"; // Adjust the import path as needed

declare module "#app" {
  interface NuxtApp {
    $clg: ConsoleLogAdvanced;
  }
  interface NuxtApp {
    $dateConvertor: (_input: string | Dayjs) => string;
  }
}
