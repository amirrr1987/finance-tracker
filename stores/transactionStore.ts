import { defineStore } from "pinia";
import type { TransactionDTO } from "~/types/transaction.model";
export const useTransactionStore = defineStore("transaction", () => {
  const transactions = ref<TransactionDTO.Content[]>([]);
  const transaction = ref<TransactionDTO.Content>({} as TransactionDTO.Content);
  const isLoading = ref({
    getAll: false,
    createOne: false,
    editOne: false,
    updateOne: false,
    deleteOneById: false,
    getOneById: false,
  });
  const getAll = async () => {
    isLoading.value.getAll = true;
    try {
      const data = await $fetch<TransactionDTO.Content[]>(
        "/api/v1/transaction"
      );
      transactions.value = [];
      transactions.value = data;
    } catch (error) {
      console.log((error as Error).message);
    } finally {
      isLoading.value.getAll = false;
    }
  };
  const deleteOneById = async (id: number) => {
    isLoading.value.deleteOneById = true;
    try {
      await $fetch(`/api/v1/transaction/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log((error as Error).message);
    } finally {
      isLoading.value.deleteOneById = false;
    }
  };
  const getOneById = async (id: number) => {
    isLoading.value.getOneById = true;
    try {
      const data = await $fetch<TransactionDTO.Content>(
        `/api/v1/transaction/${id}`,
        {
          method: "get",
        }
      );
      transaction.value = data as TransactionDTO.Content;
    } catch (error) {
      console.log((error as Error).message);
    } finally {
      isLoading.value.getOneById = false;
    }
  };
  const createOne = async () => {
    isLoading.value.createOne = true;
    console.log("🚀 ~ createOne ~ transaction.value:", transaction.value);
    try {
      await $fetch("/api/v1/transaction/create", {
        method: "POST",
        body: transaction.value as TransactionDTO.Content,
      });
    } catch (error) {
      console.log((error as Error).message);
    } finally {
      isLoading.value.createOne = false;
    }
  };
  const editOne = async () => {
    isLoading.value.editOne = true;
    console.log("🚀 ~ editOne ~ transaction.value:", transaction.value);
    try {
      await $fetch<TransactionDTO.Content>(
        `/api/v1/transaction/${transaction.value.id}`,
        {
          method: "PUT",
          body: transaction.value,
        }
      );
    } catch (error) {
      console.log((error as Error).message);
    } finally {
      isLoading.value.editOne = false;
    }
  };
  interface Grouped {
    [key: string]: TransactionDTO.Content[];
  }
  const { $dateConvertor } = useNuxtApp();
  const transactionsGroupByDate = computed(() => {
    const grouped: Grouped = {};
    for (const transaction of transactions.value) {
      const date = $dateConvertor(transaction.createdAt);
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(transaction);
    }
    return grouped;
  });

  const inComes = computed(() => {
    return transactions.value.filter((i) => i.type === "Income");
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
    return transactions.value.filter(
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
    transactions,
    isLoading,
    getAll,
    deleteOneById,
    getOneById,
    createOne,
    editOne,
    transactionsGroupByDate,
    inComes,
    inComeCount,
    inComesTotal,
    expenses,
    expenseCount,
    expenseTotal,
  };
});
