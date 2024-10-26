export const useFetchError = () => {
  const handleError = (error: unknown) => {
    if (!error) return;
    const err = isRef(error) ? error.value : error;
    if (err instanceof Error) {
      return err.message;
    }
    return "An unknown error occurred.";
  };

  return handleError;
};