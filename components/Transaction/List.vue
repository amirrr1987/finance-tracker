<template>
  <TrendList
    :expense-count="transactions.expenseCount.value"
    :expense-total="transactions.expenseTotal.value"
    :in-come-count="transactions.inComeCount.value"
    :in-comes-total="transactions.inComesTotal.value"
    :is-loading="transactions.status.value.getAll === 'pending'"
  />

  <section>
    <UContainer>
      <!-- {{ transactions.transactions.all.value }} -->
    </UContainer>
  </section>
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
      <div class="flex gap-4">
        <UButton
          label="Add"
          icon="i-heroicons-plus"
          variant="soft"
          @click="isOpen = true"
        />
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
  transactions.findAndSetTransactionById(id);
  isOpen.value = true;
  await transactions.getOneById();
};
const deleteTransaction = async (id: TransactionDTO.Content["id"]) => {
  transactions.findAndSetTransactionById(id);
  await transactions.deleteOneById();
  await transactions.getAll();
};

const submitTransaction = async () => {
  if (transactions.transaction.value.id) {
    await transactions.updateOneById();
  } else {
    await transactions.create();
  }
  isOpen.value = false;
  transactions.transaction.value = {} as TransactionDTO.Content;
  await transactions.getAll();
};
</script>
