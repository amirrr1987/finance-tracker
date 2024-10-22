export const useCrudFetch = async (
  url: string,
  method: string,
  body?: unknown,
  handleFetchError: (error: unknown) => string
) => {
  try {
    const { data, error } = await useFetch(url, {
      method,
      body,
    });
    if (error) {
      throw new Error(handleFetchError(error));
    }
    return { success: true, data: data.value };
  } catch (error) {
    return { success: false, message: handleFetchError(error) };
  }
};
