import type { TransactionDTO } from "~/types/transaction.model";
import { transactionSchema } from "~/schema/transaction.schema";

export const useAmir = () => {
  const toast = useToast();
  const loader = useLoading();
  const fetchError = useFetchError();
  const transaction = ref<TransactionDTO.Content>({} as TransactionDTO.Content);
  const createOne = {
    loader: loader,
    success: ref<boolean>(false),
    error: ref<string>(),
    status: ref<string>(),

    fetch: async () => {
      createOne.loader.start();
      const validator = await useValidator(
        transactionSchema.createOne.request,
        transaction.value
      );
      if (!validator.valid) {
        validator.issues?.map((issue) => {
          toast.add({
            title: "Error",
            description: `this filed ${issue.path[0]} is received ${issue.received} but expected is ${issue.expected}`,
            timeout: 100000,
            color: "red",
          });
        });

        return;
      }
      try {
        const { error, status } = await useFetch("/api/v1/transaction/create", {
          method: "POST",
          body: transaction.value as TransactionDTO.Content,
        });
        if (error.value) {
          createOne.error.value = fetchError(error);
          throw new Error(createOne.error.value);
        }
        createOne.success.value = true;
        createOne.status.value = status.value;
      } catch (error) {
        createOne.error.value = fetchError(error);
        createOne.success.value = false;
      } finally {
        createOne.loader.stop();
      }
    },
  };
  return { createOne, transaction };
};
