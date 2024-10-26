import type { AsyncDataRequestStatus } from "#app";
import type { TransactionDTO } from "~/types/transaction.model";
interface Status {
  getAll: AsyncDataRequestStatus;
  getOneById: AsyncDataRequestStatus;
  updateOneById: AsyncDataRequestStatus;
  deleteOneById: AsyncDataRequestStatus;
}
export const useTransactions = () => {
  const transaction = ref<TransactionDTO.Content>({} as TransactionDTO.Content);
  const transactionList = ref<TransactionDTO.Content[]>([]);
  const status = ref<Status>({
    deleteOneById: "idle",
    getAll: "idle",
    getOneById: "idle",
    updateOneById: "idle",
  } as Status);
  const getAll = async () => {
    const result = useFetch<TransactionDTO.Content[]>("/api/v1/transaction");
    try {
      status.value.getAll = "pending";
      await result.execute();
      transactionList.value = result.data.value ?? [];
    } catch (error) {
      console.log(error);
      status.value.getAll = "error";
    } finally {
      status.value.getAll = "success";
    }
  };
  const getOneById = async (id: TransactionDTO.Content["id"]) => {
    const result = useFetch<TransactionDTO.Content>(
      `/api/v1/transaction/${id}`
    );
    try {
      status.value.getOneById = "pending";
      await result.execute();
      transaction.value = result.data.value ?? ({} as TransactionDTO.Content);
    } catch (error) {
      console.log(error);
      status.value.getOneById = "error";
    } finally {
      status.value.getOneById = "success";
    }
  };
  const updateOneById = async (transaction: TransactionDTO.Content) => {
    const result = useFetch(`/api/v1/transaction/${transaction.id}`, {
      method: "put",
      body: transaction,
    });
    try {
      status.value.updateOneById = "pending";
      await result.execute();
    } catch (error) {
      console.log(error);
      status.value.updateOneById = "error";
    } finally {
      status.value.updateOneById = "success";
    }
  };
  const deleteOneById = async (id: TransactionDTO.Content["id"]) => {
    const result = useFetch(`/api/v1/transaction/${id}`, {
      method: "delete",
    });
    try {
      status.value.deleteOneById = "pending";
      await result.execute();
    } catch (error) {
      console.log(error);
      status.value.deleteOneById = "error";
    } finally {
      status.value.deleteOneById = "success";
    }
  };

  interface Grouped {
    [key: string]: TransactionDTO.Content[];
  }
  const { $dateConvertor } = useNuxtApp();
  const transactionListGroupByDate = computed(() => {
    const grouped: Grouped = {};
    for (const transaction of transactionList.value) {
      const date = $dateConvertor(transaction.createdAt);
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(transaction);
    }
    return grouped;
  });

  const inComes = computed(() => {
    return transactionList.value.filter((i) => i.type === "Income");
  });
  const inComeCount = computed(() => inComes.value.length);
  const inComesTotal = computed(() => {
    return inComes.value.reduce(
      (sum: number, transaction: TransactionDTO.Content) =>
        sum + transaction.amount,
      0
    );
  });
  const expenses = computed(() => {
    return transactionList.value.filter(
      (i: TransactionDTO.Content) => i.type === "Expense"
    );
  });
  const expenseCount = computed(() => expenses.value.length);
  const expenseTotal = computed(() => {
    return expenses.value.reduce(
      (sum: number, transaction: TransactionDTO.Content) =>
        sum + transaction.amount,
      0
    );
  });

  return {
    transaction,
    transactionList,
    status,
    getAll,
    getOneById,
    updateOneById,
    deleteOneById,
    transactionListGroupByDate,
    inComeCount,
    inComesTotal,
    expenseCount,
    expenseTotal,
  };
};
