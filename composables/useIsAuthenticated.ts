export const useIsAuthenticated = (url = "/") => {
  const user = useSupabaseUser();

  watch(
    user,
    () => {
      if (user.value) {
        return navigateTo(url);
      }
    },
    {
      immediate: true,
    }
  );
};
