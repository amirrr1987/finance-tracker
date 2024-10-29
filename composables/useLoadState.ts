export const useLoadState = () => {
  const isLoading = useState<Record<string, boolean>>(
    "loadState",
    () => ({})
  );
  // const isLoading = ref<Record<string, boolean>>({});
  const start = (key: string) => {
    isLoading.value[key] = true;
  };

  const stop = (key: string) => {
    isLoading.value[key] = false;
  };

  return { isLoading, start, stop };
};
