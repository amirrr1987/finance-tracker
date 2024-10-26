<template>
  <section class="">
    <UContainer>
      <TransactionForm
        v-model="isOpen"
        v-model:transaction="transactions.transaction.value"
        :is-fetching="transactions.status.value.getOneById"
        :is-submitting="transactions.status.value.updateOneById"
        @close="isOpen = false"
        @submit="submitTransaction"
      />
      <div class="mb-4 flex gap-4">
        <UButton @click="transactions.getAll">execute</UButton>
      </div>
      <template v-if="transactions.status.value.getAll === 'pending'">
        <USkeleton v-for="item in 4" :key="item" class="h-12 mb-4" />
      </template>
      <template v-if="transactions.status.value.getAll === 'success'">
        <template
          v-for="(transactionGroupByDate, date) in transactions
            .transactionListGroupByDate.value"
          :key="date"
        >
          <div class="pt-12 space-y-4">
            <TransactionDailySummery
              :date="date"
              :transactions="transactionGroupByDate"
            />
            <div class="space-y-4">
              <Transaction
                v-for="transaction in transactionGroupByDate"
                :key="transaction.id"
                :transaction="transaction"
                :status="transactions.status.value.deleteOneById"
                @edit="editTransaction"
                @delete="deleteTransaction"
              />
            </div>
          </div>
        </template>
      </template>
    </UContainer>
  </section>
</template>
<script setup lang="ts">
import type { TransactionDTO } from "~/types/transaction.model";

const transactions = useTransactions();
await transactions.getAll();

const isOpen = ref(false);
const editTransaction = async (id: TransactionDTO.Content["id"]) => {
  isOpen.value = true;
  await transactions.getOneById(id);
};
const deleteTransaction = async (id: TransactionDTO.Content["id"]) => {
  await transactions.deleteOneById(id);
  await transactions.getAll();
};

const submitTransaction = async () => {
  await transactions.updateOneById(transactions.transaction.value);
  isOpen.value = false;
  await transactions.getAll();
};
</script>
