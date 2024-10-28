<template>
  <section>
    <UContainer>
      <TransactionForm
        v-model="isOpen"
        v-model:transaction="transactionStore.transaction"
        :is-fetching="transactionStore.status.getOneById"
        :is-submitting="
          transactionStore.transaction.id
            ? transactionStore.status.updateOneById
            : transactionStore.status.create
        "
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
      <template v-if="transactionStore.status.getAll === 'pending'">
        <USkeleton v-for="item in 4" :key="item" class="h-12 mb-4" />
      </template>
      <template v-if="transactionStore.status.getAll === 'success'">
        <template
          v-for="(
            transactionGroupByDate, date
          ) in transactionStore.transactionsGroupByDate"
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
                :status="transactionStore.status.deleteOneById"
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

const transactionStore = useTransactionStore();
await transactionStore.getAll();

const isOpen = ref(false);
const editTransaction = async (id: TransactionDTO.Content["id"]) => {
  isOpen.value = true;
  await transactionStore.getOneById(id);
};
const deleteTransaction = async (id: TransactionDTO.Content["id"]) => {
  await transactionStore.deleteOneById(id);
  await transactionStore.getAll();
};

const submitTransaction = async () => {
  if (transactionStore.transaction.id) {
    await transactionStore.updateOneById(transactionStore.transaction);
  } else {
    await transactionStore.create(transactionStore.transaction);
  }
  isOpen.value = false;
  await transactionStore.getAll();
};
</script>
