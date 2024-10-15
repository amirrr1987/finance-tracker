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
            @add="addTransaction"
            @close="closeTransaction"
          />
        </div>
      </div>
      <UDivider class="my-8" />
      <template v-if="transactions && transactions.length >= 0">
        <template
          v-for="(transaction, index) in transactions"
          :key="transaction.id"
        >
          <Transaction
            :transaction="transaction"
            @delete="deleteTransaction"
            @edit="editTransaction"
          />
          <UDivider v-if="index + 1 < transactions.length" class="my-4" />
        </template>
      </template>
      <USkeleton v-else class="h-12" />
    </UContainer>
  </section>
</template>
<script setup lang="ts">
import type { Transaction } from "~/types/transaction.model";

const { data: transactions, refresh } = await useFetch<Transaction[]>(
  "/api/v1/transaction"
);
interface State {
  amount: number;
  category: string;
  description: string;
  type: string;
}
const isOpen = ref(false);
const state = ref<State>({
  amount: 0,
  category: "",
  description: "",
  type: "",
});
const addTransaction = async () => {
  await useFetch("/api/v1/transaction/create", {
    method: "POST",
    body: { ...state.value } as Transaction,
  });
  await refresh();
  isOpen.value = false;
  state.value = {} as Transaction;
};

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

const { $clg } = useNuxtApp();
$clg.logger({
  name: "1",
  value: 1,
  path: "components-Transaction-List.vue",
  line: "84",
  date: "2024-October-15",
  time: "16:56:04",
  comment: `comment`,
});

const editTransaction = async (id: number) => {
  const { data } = await useFetch<Transaction>(`/api/v1/transaction/${id}`, {
    method: "get",
  });
  state.value = data.value as Transaction;
  isOpen.value = true;
};
</script>
