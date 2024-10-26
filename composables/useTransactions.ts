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

  const create = async () => {
    status.value.updateOneById = "pending";

    try {
      const { error } = await useAsyncData("create-transaction", async () => {
        const result = await useFetch(`/api/v1/transaction/create`, {
          method: "POST",
          body: transaction.value,
        });

        return result.data.value;
      });

      if (error.value) {
        throw new Error(error.value.message);
      }

      status.value.updateOneById = "success";
    } catch (error) {
      console.log(error);
      status.value.updateOneById = "error";
    }
  };

  const getAll = async () => {
    status.value.getAll = "pending";

    try {
      const { data, error } = await useAsyncData(
        "transactions-all",
        async () => {
          const result = await useFetch<TransactionDTO.Content[]>(
            "/api/v1/transaction"
          );
          return result.data.value;
        }
      );

      if (error.value) {
        throw new Error(error.value.message);
      }

      transactionList.value = data.value ?? [];
      status.value.getAll = "success";
    } catch (error) {
      console.log(error);
      status.value.getAll = "error";
    }
  };

  const getOneById = async () => {
    status.value.getOneById = "pending";

    try {
      const { error, data } = await useAsyncData(
        `transaction-${transaction.value.id}`,
        async () => {
          const result = await useFetch<TransactionDTO.Content>(
            `/api/v1/transaction/${transaction.value.id}`
          );

          if (result.error.value) {
            throw new Error(result.error.value.message);
          }

          return result.data.value;
        }
      );

      if (error.value) {
        throw new Error(error.value.message);
      }

      transaction.value = data.value ?? ({} as TransactionDTO.Content);
      status.value.getOneById = "success";
    } catch (error) {
      console.log(error);
      status.value.getOneById = "error";
    }
  };

  const updateOneById = async () => {
    status.value.updateOneById = "pending";

    try {
      const { error } = await useAsyncData(
        `transaction-update-${transaction.value.id}`,
        async () => {
          const result = await useFetch(
            `/api/v1/transaction/${transaction.value.id}`,
            {
              method: "PUT",
              body: transaction.value,
            }
          );

          if (result.error.value) {
            throw new Error(result.error.value.message);
          }
        }
      );

      if (error.value) {
        throw new Error(error.value.message);
      }

      status.value.updateOneById = "success";
    } catch (error) {
      console.log(error);
      status.value.updateOneById = "error";
    }
  };

  const deleteOneById = async () => {
    status.value.deleteOneById = "pending";

    try {
      const { error } = await useAsyncData(
        `transaction-${transaction.value.id}`,
        () =>
          useFetch(`/api/v1/transaction/${transaction.value.id}`, {
            method: "delete",
          })
      );

      if (error.value) {
        throw new Error(error.value.message);
      }

      status.value.deleteOneById = "success";
    } catch (error) {
      console.log(error);
      status.value.deleteOneById = "error";
    }
  };

  const findAndSetTransactionById = (id: TransactionDTO.Content["id"]) => {
    const index = transactionList.value.findIndex((item) => item.id === id);
    transaction.value = transactionList.value[index];
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
        sum - transaction.amount,
      0
    );
  });

  return {
    transactions: {
      one: transaction,
      all: transactionList,
      grouped: {
        byDate: transactionListGroupByDate,
      },
    },
    inCome: {
      total: inComesTotal,
      count: inComeCount,
    },
    expense: {
      total: expenseTotal,
      count: expenseCount,
    },
    crud: {
      getAll,
      getOneById,
      updateOneById,
      deleteOneById,
      create,
    },
    findAndSetTransactionById,
    transaction,
    transactionList,
    status,
    getAll,
    create,
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
