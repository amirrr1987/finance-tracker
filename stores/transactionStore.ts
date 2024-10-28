import type { AsyncDataRequestStatus } from "#app";
import { defineStore } from "pinia";
import type { Grouped, TransactionDTO } from "~/types/transaction.model";
interface Status {
  getAll: AsyncDataRequestStatus;
  getOneById: AsyncDataRequestStatus;
  updateOneById: AsyncDataRequestStatus;
  deleteOneById: AsyncDataRequestStatus;
}
export const useTransactionStore = defineStore("transaction", () => {
  const supabaseClient = useSupabaseClient();
  const supabaseUser = useSupabaseUser();
  const loadState = useLoadState();
  const transaction = ref<TransactionDTO.Content>({} as TransactionDTO.Content);
  const transactionList = ref<TransactionDTO.Content[]>([]);
  const status = ref<Status>({} as Status);

  const create = async (obj: TransactionDTO.Content) => {
    status.value.updateOneById = "pending";
    try {
      const { error } = await useAsyncData(
        `fetchTransaction_${id}`,
        async () => {
          const result = await supabaseClient
            .from("transactions")
            .insert(obj)
            .select();

          return result.data ?? ({} as TransactionDTO.Content);
        }
      );

      status.value.getOneById = error.value ? "error" : "success";
    } catch (error) {
      console.error(error);
      status.value.updateOneById = "error";
    }
  };

  const getAll = async () => {
    status.value.getAll = "pending";
    loadState.start();
    try {
      const { data, error } = await useAsyncData(
        "fetchTransactions",
        async () => {
          const result = await supabaseClient.from("transactions").select();
          return result.data as TransactionDTO.Content[];
        }
      );
      transactionList.value = data.value ?? [];
      status.value.getAll = error.value ? "error" : "success";
    } catch (error) {
      console.log(error);
      status.value.getAll = "error";
    } finally {
      loadState.stop();
    }
  };

  const getOneById = async (id: TransactionDTO.Content["id"]) => {
    status.value.getOneById = "pending";
    loadState.start();
    try {
      const { data, error } = await useAsyncData(
        `fetchTransaction_${id}`,
        async () => {
          const result = await supabaseClient
            .from("transactions")
            .select()
            .eq("id", id)
            .single();
          return result.data ?? ({} as TransactionDTO.Content);
        }
      );

      transaction.value = data.value ?? ({} as TransactionDTO.Content);
      status.value.getOneById = error.value ? "error" : "success";
    } catch (error) {
      console.log(error);
      status.value.getOneById = "error";
    } finally {
      loadState.stop();
    }
  };

  const updateOneById = async (obj: TransactionDTO.Content) => {
    status.value.updateOneById = "pending";
    loadState.start();
    try {
      await supabaseClient.from("transactions").update(obj);
      status.value.updateOneById = "success";
    } catch (error) {
      console.log(error);
      status.value.updateOneById = "error";
    } finally {
      loadState.stop();
    }
  };

  const deleteOneById = async (id: TransactionDTO.Content["id"]) => {
    status.value.deleteOneById = "pending";
    loadState.start();
    try {
      await supabaseClient.from("transactions").delete().eq("id", id);
      status.value.deleteOneById = "success";
    } catch (error) {
      console.log(error);
      status.value.deleteOneById = "error";
    } finally {
      loadState.stop();
    }
  };

  const findAndSetTransactionById = (id: TransactionDTO.Content["id"]) => {
    const index = transactionList.value.findIndex((item) => item.id === id);
    transaction.value = transactionList.value[index];
  };

  const { $dateConvertor } = useNuxtApp();
  const transactionsGroupByDate = computed(() => {
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
    getAll,
    create,
    getOneById,
    updateOneById,
    deleteOneById,
    findAndSetTransactionById,
    status,
    transactionsGroupByDate,
    inComeCount,
    inComesTotal,
    expenseCount,
    expenseTotal,
  };
});
