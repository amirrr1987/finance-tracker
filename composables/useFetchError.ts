// useFetchError.ts
// export const useFetchError = () => {
//   const handleFetchError = (error: unknown) => {
//     const temp = isRef(error) ? error.value : error;
//     if (temp instanceof Error) {
//       return temp.message;
//     } else {
//       return "An unknown error occurred.";
//     }
//   };

//   return handleFetchError;
// };
export const useFetchError = () => {
  const handleFetchError = (error: unknown) => {
    if (!error) return;
    const temp = isRef(error) ? error.value : error;
    if (temp instanceof Error) {
      return temp.message;
    }
    return "An unknown error occurred.";
  };

  return handleFetchError;
};
