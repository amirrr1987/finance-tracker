<template>
  <section class="py-4 md:py-6 lg:py-8">
    <UContainer>
      <div class="flex justify-between">
        <h4 class="font-semibold text-xl">List</h4>
        <div>
          <UButton
            label="Add"
            trailing-icon="i-heroicons-plus"
            variant="soft"
            @click="isOpen = true"
          />
          <TransactionForm
            v-model="isOpen"
            v-model:state="state"
            :is-edit="isEdit"
            :is-loading="isLoading"
            @edit="editTransaction"
            @add="addTransaction"
            @close="closeTransaction"
          />
        </div>
      </div>
      <UDivider class="my-8" />
      <div
        v-for="(transactionsOnDay, date) in transactionsGroupByDate"
        :key="date"
        class="mb-12"
      >
        <TransactionDailySummery
          :date="(date as string)"
          :transactions="transactionsOnDay"
        />
        <Transaction
          v-for="transaction in transactionsOnDay"
          :key="transaction.id"
          :transaction="transaction"
          :is-loading="deleteIsLoading"
          :selected-transaction-id="selectedTransactionId"
          @delete="deleteTransaction(transaction.id)"
          @get="getTransaction"
        />
      </div>
    </UContainer>
  </section>
</template>
<script setup lang="ts">
import type { Transaction } from "~/types/transaction.model";

const { data: transactions, refresh } = await useFetch<Transaction[]>(
  "/api/v1/transaction"
);

const isOpen = ref(false);
const state = ref<Transaction>({
  amount: 0,
  category: "",
  description: "",
  type: "",
  id: 0,
  createdAt: "",
});

const closeTransaction = () => {
  isOpen.value = false;
  setTimeout(() => {
    state.value = {} as Transaction;
  }, 300);
};

const deleteIsLoading = ref(false);
const selectedTransactionId = ref<number>(-1);
const tosat = useToast()
const deleteTransaction = async (id: number) => {
  deleteIsLoading.value = true;
  selectedTransactionId.value = id;
  try {
    await useFetch(`/api/v1/transaction/${id}`, {
      method: "DELETE",
    });
    await refresh();
    tosat.add({
      title: 'Deleted success',
      description: `${id} deleted success`,
      icon: 'i-heroicons-check-circle'
    })
  } catch (error) {
    console.log(error);
  } finally {
    deleteIsLoading.value = false;
    selectedTransactionId.value = -1;
  }
};

const isEdit = ref(false);
const getTransaction = async (id: number) => {
  const { data } = await useFetch<Transaction>(`/api/v1/transaction/${id}`, {
    method: "get",
  });
  state.value = data.value as Transaction;
  isEdit.value = true;
  isOpen.value = true;
};

const isLoading = ref(false);
const toast = useToast();

const addTransaction = async () => {
  isLoading.value = true;
  try {
    await useFetch("/api/v1/transaction/create", {
      method: "POST",
      body: state.value as Transaction,
    });
    await toast.add({
      title: "Success add",
    });
    await refresh();
  } catch (error) {
    toast.add({
      title: "error add",
      color: "red",
      description: (error as Error).message,
    });
  } finally {
    isLoading.value = false;
    isOpen.value = false;
    state.value = {} as Transaction;
  }
};
const editTransaction = async () => {
  const { data } = await useFetch<Transaction>(
    `/api/v1/transaction/${state.value.id}`,
    {
      method: "PUT",
      body: state.value,
    }
  );
  console.log(data.value);
  isEdit.value = false;
  isOpen.value = false;
};
interface Grouped {
  [key: string]: Transaction[];
}
const { $dateConvertor } = useNuxtApp();
const transactionsGroupByDate = computed(() => {
  const grouped: Grouped = {};
  for (const transaction of transactions.value ?? []) {
    const date = $dateConvertor(transaction.createdAt);
    if (!grouped[date]) {
      grouped[date] = [];
    }

    grouped[date].push(transaction);
  }
  return grouped;
});
</script>
