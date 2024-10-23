import { defineStore } from "pinia";
import type { TransactionDTO } from "~/types/transaction.model";
// import type { TransactionDTO } from "~/types/transaction.model";
export const useTransactionStore = defineStore("transaction", () => {
  const transaction = ref<TransactionDTO.Content>({} as TransactionDTO.Content);
  const transactions = ref<TransactionDTO.Content[]>([]);
  const transactionsCurd = useTransactions();

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
    ...transactionsCurd,
    transactionsGroupByDate,
    inComeCount,
    inComesTotal,
    expenseCount,
    expenseTotal,
  };
});
