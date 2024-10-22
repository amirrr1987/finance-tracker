// useLoading.ts
export const useLoading = () => {
  const loading = ref<boolean>(false);
  const start = () => (loading.value = true);
  const stop = () => (loading.value = false);
  return { loading, start, stop };
};
