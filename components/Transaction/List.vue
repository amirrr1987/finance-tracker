<template>
  <section class="py-4 md:py-6 lg:py-8">
    <UContainer>
      <div class="flex justify-between">
        <h4>List</h4>
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
            @edit="editTransaction"
            @add="addTransaction"
            @close="closeTransaction"
          />
        </div>
      </div>
      <UDivider class="my-8" />
      <template
        v-for="(transactionsOnDay, date) in transactionsGroupByDate"
        :key="date"
      >
        <!-- <template v-if="transactionsOnDay && transactionsOnDay.length >= 0"> -->
        <template
          v-for="(transaction, index) in transactionsOnDay"
          :key="transaction.id"
        >
          <TransactionDailySummery
            :date="(date as string)"
            :transactions="transactionsOnDay"
          />
          <Transaction
            :transaction="transaction"
            @delete="deleteTransaction"
            @get="getTransaction"
          />
          <UDivider v-if="index + 1 < transactionsOnDay.length" class="my-4" />
          <!-- </template> -->
        </template>

        <!-- <USkeleton v-else class="h-12" /> -->
      </template>
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
  created_at: "",
});

const closeTransaction = () => {
  isOpen.value = false;
  setTimeout(() => {
    state.value = {} as Transaction;
  }, 300);
};

const deleteTransaction = async (id: number) => {
  await useFetch(`/api/v1/transaction/${id}`, {
    method: "DELETE",
  });
  await refresh();
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
const addTransaction = async () => {
  await useFetch("/api/v1/transaction/create", {
    method: "POST",
    body: { ...state.value } as Transaction,
  });
  await refresh();
  isOpen.value = false;
  state.value = {} as Transaction;
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
const transactionsGroupByDate = computed(() => {
  const grouped: Grouped = {};
  for (const transaction of transactions.value ?? []) {
    const date = new Date(transaction.created_at).toISOString().split("T")[0];
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(transaction);
  }
  return grouped;
});
</script>
