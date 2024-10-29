export const useErrorHandler = () => {
  const toast = useToast();
  const statusState = useStatusState();

  const manageError = (error: unknown, action: string) => {
    console.error(error);

    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";

    const errorTitle = error instanceof Error ? error.name : "Error";

    // تنظیم وضعیت خطا
    statusState.handler(action, "error");

    // نمایش نوتیفیکیشن خطا
    toast.add({
      title: errorTitle,
      description: errorMessage,
      color: "red",
    });
  };

  return { manageError };
};
