import { defineStore } from "pinia";
import type { Grouped, TransactionDTO } from "~/types/transaction.model";

export const useTransactionStore = defineStore("transaction", () => {
  const supabaseClient = useSupabaseClient();
  const loadState = useLoadState();
  const statusState = useStatusState();
  const appToast = useAppToast();

  const { manageError } = useErrorHandler();

  // State Variables
  const transaction = ref<TransactionDTO.Content>({} as TransactionDTO.Content);
  const transactionList = ref<TransactionDTO.Content[]>([]);

  // Computed States
  const isLoading = computed(() => loadState.isLoading.value);
  const status = computed(() => statusState.status.value);

  // CRUD Operations
  const create = async (transactionData: TransactionDTO.Content) => {
    try {
      statusState.handler("create", "pending");
      loadState.start("create");

      const { error } = await useAsyncData("createTransaction", async () => {
        const { data, error } = await supabaseClient
          .from("transactions")
          .insert(transactionData)
          .single();
        return data ?? ({} as TransactionDTO.Content);
      });

      if (error.value) throw error.value;
      statusState.handler("create", "success");
      appToast.success("create");
    } catch (error) {
      manageError(error, "create");
      appToast.error("create");
    } finally {
      loadState.stop("create");
    }
  };

  const getAll = async () => {
    try {
      statusState.handler("getAll", "pending");
      loadState.start("getAll");

      const { data, error } = await useAsyncData(
        "getAllTransactions",
        async () => {
          const { data, error } = await supabaseClient
            .from("transactions")
            .select();
          return error ? [] : data;
        }
      );

      if (error.value) throw error.value;
      transactionList.value = data.value as TransactionDTO.Content[];
      statusState.handler("getAll", "success");
      appToast.success("getAll");
    } catch (error) {
      manageError(error, "getAll");
      appToast.error("getAll");
    } finally {
      loadState.stop("getAll");
    }
  };

  const getOneById = async (id: TransactionDTO.Content["id"]) => {
    try {
      statusState.handler("getOneById", "pending");
      loadState.start("getOneById");

      const { data, error } = await useAsyncData(
        `getTransaction_${id}`,
        async () => {
          const { data } = await supabaseClient
            .from("transactions")
            .select()
            .eq("id", id)
            .single();
          return data ?? ({} as TransactionDTO.Content);
        }
      );

      if (error.value) throw error.value;
      transaction.value = data.value ?? ({} as TransactionDTO.Content);
      statusState.handler("getOneById", "success");
      appToast.success("getOneById");
    } catch (error) {
      manageError(error, "getOneById");
      appToast.error("getOneById");
    } finally {
      loadState.stop("getOneById");
    }
  };

  const updateOneById = async (transactionData: TransactionDTO.Content) => {
    try {
      statusState.handler("updateOneById", "pending");
      loadState.start("updateOneById");

      const { error } = await useAsyncData(
        `updateTransaction_${transactionData.id}`,
        async () => {
          await supabaseClient.from("transactions").upsert(transactionData);
        }
      );

      if (error.value) throw error.value;
      transaction.value = {} as TransactionDTO.Content;
      statusState.handler("updateOneById", "success");
      appToast.success("updateOneById");
    } catch (error) {
      manageError(error, "updateOneById");
      appToast.error("updateOneById");
    } finally {
      loadState.stop("updateOneById");
    }
  };

  const deleteOneById = async (id: TransactionDTO.Content["id"]) => {
    try {
      statusState.handler("deleteOneById", "pending");
      loadState.start("deleteOneById");

      const { error } = await useAsyncData(
        `deleteTransaction_${id}`,
        async () => {
          await supabaseClient.from("transactions").delete().eq("id", id);
        }
      );

      if (error.value) throw error.value;
      statusState.handler("deleteOneById", "success");
      appToast.success("deleteOneById", `id: ${id} is deleted`);
    } catch (error) {
      manageError(error, "deleteOneById");
      appToast.error("deleteOneById");
    } finally {
      loadState.stop("deleteOneById");
    }
  };

  // Helper and Computed Properties
  const findOneById = (id: TransactionDTO.Content["id"]) => {
    const transactionIndex = transactionList.value.findIndex(
      (item) => item.id === id
    );
    transaction.value =
      transactionIndex !== -1
        ? transactionList.value[transactionIndex]
        : ({} as TransactionDTO.Content);
  };

  const { $dateConvertor } = useNuxtApp();
  const transactionListGroupedByDate = computed(() => {
    const grouped: Grouped = {};
    transactionList.value.forEach((transaction) => {
      const date = $dateConvertor(transaction.createdAt);
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(transaction);
    });
    return grouped;
  });

  const incomeList = computed(() =>
    transactionList.value.filter((transaction) => transaction.type === "Income")
  );
  const incomeListCount = computed(() => incomeList.value.length);
  const incomeListTotal = computed(() =>
    incomeList.value.reduce((sum, transaction) => sum + transaction.amount, 0)
  );

  const expenseList = computed(() =>
    transactionList.value.filter(
      (transaction) => transaction.type === "Expense"
    )
  );
  const expenseCount = computed(() => expenseList.value.length);
  const expenseListTotal = computed(() =>
    expenseList.value.reduce((sum, transaction) => sum + transaction.amount, 0)
  );

  return {
    isLoading,
    status,
    transaction,
    transactionList,
    create,
    getAll,
    getOneById,
    updateOneById,
    deleteOneById,
    findOneById,
    transactionListGroupedByDate,
    incomeListCount,
    incomeListTotal,
    expenseCount,
    expenseListTotal,
  };
});
