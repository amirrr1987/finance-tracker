<template>
  <section class="py-4 md:py-6 lg:py-8">
    <UContainer>
      <UButton
        trailing-icon="i-heroicons-plus"
        class="mb-4"
        @click="isOpen = true"
      />
      <TransactionForm
        v-model="isOpen"
        v-model:state="state"
        @add="addTransaction"
      />

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
  type: "Income",
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

const deleteTransaction = async (id: number) => {
  console.log(id);

  await useFetch(`/api/v1/transaction/${id}`, {
    method: "DELETE",
  });
  await refresh();
};
const editTransaction = () => {};
</script>
