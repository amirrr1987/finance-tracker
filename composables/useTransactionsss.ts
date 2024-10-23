import type { TransactionDTO } from "~/types/transaction.model";
import { transactionSchema } from "~/schema/transaction.schema";
import type { z } from "zod";

export const useTransaction = () => {
  const fetchError = useFetchError();
  const transaction = ref<TransactionDTO.Content>({} as TransactionDTO.Content);
  const transactions = ref<TransactionDTO.Content[]>([]);

  const createOne = {
    loading: useLoading(),
    success: ref<boolean>(false),
    error: ref<string>(),
    status: ref<string>(),
    validateIssues: ref<z.ZodIssue[]>(),

    validate: async (value: unknown) => {
      const validator = await useValidator(
        transactionSchema.createOne.request,
        value
      );
      if (!validator.valid) {
        createOne.validateIssues.value = validator.issues;
        createOne.loading.stop();
        return;
      }
    },
    fetch: async () => {
      createOne.loading.start();
      createOne.validate(transaction);
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
        createOne.loading.stop();
      }
    },
  };

  const getAll = {
    loading: useLoading(),
    success: ref<boolean>(false),
    error: ref<string>(),
    status: ref<string>(),
    fetch: async () => {
      getAll.loading.start();
      try {
        const { data, error } = await useFetch<TransactionDTO.GetAll.Response>(
          "/api/v1/transaction"
        );
        if (error.value) {
          getAll.error.value = fetchError(error);
          throw new Error(getAll.error.value);
        }
        transactions.value = data.value as TransactionDTO.Content[];
        getAll.success.value = true;
      } catch (error) {
        getAll.error.value = fetchError(error);
        getAll.success.value = false;
      } finally {
        getAll.loading.stop();
      }
    },
  };

  const getOneById = {
    loading: useLoading(),
    success: ref<boolean>(false),
    error: ref<string>(),
    status: ref<string>(),
    validateIssues: ref<z.ZodIssue[]>(),
    validate: async (value: unknown) => {
      const validator = await useValidator(
        transactionSchema.getOneById.request,
        value
      );
      if (!validator.valid) {
        getOneById.validateIssues.value = validator.issues;
        getOneById.loading.stop();
        return;
      }
    },
    fetch: async (id: number) => {
      getOneById.loading.start();
      getOneById.validate(id);
      try {
        const { data, error } = await useFetch<TransactionDTO.Content>(
          `/api/v1/transaction/${id}`
        );
        if (error.value) {
          getOneById.error.value = fetchError(error);
          throw new Error(getOneById.error.value);
        }
        transaction.value = data.value as TransactionDTO.Content;
        getOneById.success.value = true;
      } catch (error) {
        getOneById.error.value = fetchError(error);
        getOneById.success.value = false;
      } finally {
        getOneById.loading.stop();
      }
    },
  };

  const deleteOneById = {
    loading: useLoading(),
    success: ref<boolean>(false),
    error: ref<string>(),
    status: ref<string>(),
    validateIssues: ref<z.ZodIssue[]>(),
    validate: async (value: unknown) => {
      const validator = await useValidator(
        transactionSchema.deleteOneById.request,
        value
      );
      if (!validator.valid) {
        deleteOneById.validateIssues.value = validator.issues;
        deleteOneById.loading.stop();
        return;
      }
    },
    fetch: async (id: number) => {
      deleteOneById.loading.start();
      deleteOneById.validate(id);
      try {
        const { error } = await useFetch(`/api/v1/transaction/${id}`, {
          method: "DELETE",
        });
        if (error.value) {
          deleteOneById.error.value = fetchError(error);
          throw new Error(deleteOneById.error.value);
        }
        deleteOneById.success.value = true;
      } catch (error) {
        deleteOneById.error.value = fetchError(error);
        deleteOneById.success.value = false;
      } finally {
        deleteOneById.loading.stop();
      }
    },
  };

  const updateOneById = {
    loading: useLoading(),
    success: ref<boolean>(false),
    error: ref<z.ZodIssue[]>(),
    status: ref<string>(),
    validate: async (value: unknown) => {
      const validator = await useValidator(
        transactionSchema.updateOneById.request,
        value
      );
      if (!validator.valid) {
        updateOneById.error.value = validator.issues;
        updateOneById.loading.stop();
        return;
      }
    },
    fetch: async () => {
      updateOneById.loading.start();
      await updateOneById.validate(transaction);
      try {
        const { error } = await useFetch<TransactionDTO.Content>(
          `/api/v1/transaction/${transaction.value.id}`,
          {
            method: "PUT",
            body: transaction.value,
          }
        );
        if (error.value) {
          updateOneById.error.value = fetchError(error);
          throw new Error(updateOneById.error.value);
        }
        updateOneById.success.value = true;
      } catch (error) {
        updateOneById.error.value = fetchError(error);
        updateOneById.success.value = false;
      } finally {
        updateOneById.loading.stop();
      }
    },
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
    createOne,
    getAll,
    getOneById,
    deleteOneById,
    updateOneById,
    transactionsGroupByDate,
    inComeCount,
    inComesTotal,
    expenseCount,
    expenseTotal,
  };
};
