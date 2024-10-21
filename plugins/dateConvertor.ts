import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import jalaliday from "jalaliday";
import { unitedStates } from "countries-currency-locale";
dayjs.extend(jalaliday);

export default defineNuxtPlugin({
  setup(nuxtApp) {
    const dateConvertor = (_input: string | Dayjs) => {
      return dayjs(_input).locale(unitedStates.locale).format("YYYY-MM-DD");
    };
    nuxtApp.provide("dateConvertor", dateConvertor);
  },
});
