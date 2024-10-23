import type { TransactionDTO } from "~/types/transaction.model";
import { ref } from "vue";
import type { AsyncDataRequestStatus } from "#app";

export const useTransactions = () => {
  const transaction = ref<TransactionDTO.Content>({} as TransactionDTO.Content);
  const transactionList = ref<TransactionDTO.Content[]>([]);
  const status = ref(null);
  const pending = ref<boolean>(false);
  const error = ref();
  const reset = () => {
    status.value = null;
    error.value = null;
    pending.value = true;
  };
  const getAll = async () => {
    const result = await useFetch<TransactionDTO.GetAll.Response>(
      "/api/v1/transaction"
    );
    console.log("🚀 ~ getAll ~ result.pending.value:", result.pending.value);
    transactionList.value = result.data.value ?? [];
    status.value = result.status.value;
    error.value = result.error.value;
    pending.value = result.pending.value;
  };

  const amir = {
    status: ref<AsyncDataRequestStatus>("idle"),
    error: ref<object | null>(null),
    pending: ref<boolean>(false),
    data: ref<object | null>(null),
    fetch: async () => {
      // amir.data.value = null;
      // amir.error.value = null;
      // amir.status.value = "idle";
      // amir.pending.value = false;
      const result = await useFetch<TransactionDTO.GetAll.Response>(
        "/api/v1/transaction"
      );
      amir.data.value = result.data.value;
      amir.error.value = result.error.value;
      amir.status.value = result.status.value;
      amir.pending.value = result.pending.value;
      result.refresh();
    },
  };

  const getAllData = async () => {
    return await useFetch<TransactionDTO.GetAll.Response>(
      "/api/v1/transaction"
    );
  };

  const getOneById = async () => {
    const result = await useFetch<TransactionDTO.GetOneById.Response>(
      `/api/v1/transaction/${transaction.value.id}`
    );
    status.value = result.status.value;
    error.value = result.error.value;
    pending.value = result.pending.value;
  };

  const updateOneById = async () => {
    const result = await useFetch(
      `/api/v1/transaction/${transaction.value.id}`,
      {
        method: "put",
        body: transaction.value,
      }
    );
    status.value = result.status.value;
    error.value = result.error.value;
    pending.value = result.pending.value;
  };

  const deleteOneById = async () => {
    const result = await useFetch(
      `/api/v1/transaction/${transaction.value.id}`,
      {
        method: "delete",
      }
    );
    status.value = result.status.value;
    error.value = result.error.value;
    pending.value = result.pending.value;
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
    pending,
    error,
    getAll,
    getOneById,
    updateOneById,
    deleteOneById,
    transactionListGroupByDate,
    inComeCount,
    inComesTotal,
    expenseCount,
    expenseTotal,
    amir,
    getAllData,
  };
};
