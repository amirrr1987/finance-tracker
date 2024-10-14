import { unitedStates } from "countries-currency-locale";

export const useCurrency = (amount: Ref<number | bigint> | number | bigint) => {
  const currency = computed(() => {
    return new Intl.NumberFormat(unitedStates.locale, {
      style: "currency",
      currency: unitedStates.currency,
    }).format(isRef(amount) ? amount.value : amount);
  });
  return { currency };
};
