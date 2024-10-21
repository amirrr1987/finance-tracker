import type { TransactionDTO } from "~/types/transaction.model";

export const useTransactions = () => {
  const transaction = ref<TransactionDTO.Content>({} as TransactionDTO.Content);
  const transactionList = ref<TransactionDTO.GetAll.Response>([]);
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>("");

  const getAll = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const { data, error: fetchError } =
      await useFetch<TransactionDTO.GetAll.Response>("/api/v1/transaction");
      
      if (fetchError) throw new Error(fetchError.message);
      transactionList.value = data.value;

    } catch (err) {
      error.value = (err as Error).message || "Failed to fetch transactions";
    } finally {
      isLoading.value = false;
    }
  };

  return {
    transaction,
    transactionList,
    isLoading,
    error,
    getAll,
  };
};
