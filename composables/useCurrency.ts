import { germany } from "countries-currency-locale";

export const useCurrency = (amount: Ref<number | bigint> | number | bigint) => {
  const currency = computed(() => {
    return new Intl.NumberFormat(germany.locale, {
      style: "currency",
      currency: germany.currency,
    }).format(isRef(amount) ? amount.value : amount);
  });
  return { currency };
};
