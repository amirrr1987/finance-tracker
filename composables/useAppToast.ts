export const useAppToast = () => {
  const toast = useToast();
  const success = (
    title: string,
    description: string | undefined = undefined
  ) => {
    toast.add({
      title,
      description,
      icon: "i-heroicons-check-circle",
      color: "green",
    });
  };
  const error = (
    title: string,
    description: string | undefined = undefined
  ) => {
    toast.add({
      title,
      description,
      icon: "i-heroicons-exclamation-circle",
      color: "red",
    });
  };

  return { success, error };
};
