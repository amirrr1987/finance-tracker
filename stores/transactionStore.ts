import { defineStore } from "pinia";
import type { Transaction } from "~/types/transaction.model";
export const useTransactionStore = defineStore("transaction", () => {
  const transactions = ref<Transaction[]>([]);
  const transaction = ref<Transaction>({} as Transaction);
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
      const data = await $fetch<Transaction[]>("/api/v1/transaction");
      transactions.value = data ?? [];
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
      const data  = await $fetch<Transaction>(`/api/v1/transaction/${id}`, {
        method: "get",
      });
      transaction.value = data as Transaction;
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
        body: transaction.value as Transaction,
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
      await $fetch<Transaction>(`/api/v1/transaction/${transaction.value.id}`, {
        method: "PUT",
        body: transaction.value,
      });
    } catch (error) {
      console.log((error as Error).message);
    } finally {
      isLoading.value.editOne = false;
    }
  };
  interface Grouped {
    [key: string]: Transaction[];
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
  };
});
