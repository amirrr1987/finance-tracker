export const useLoading = () => {
  const isLoading = ref<boolean>(false);
  const start = () => (isLoading.value = true);
  const stop = () => (isLoading.value = false);
  return { isLoading, start, stop };
};
