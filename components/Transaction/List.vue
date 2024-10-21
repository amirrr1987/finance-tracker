<template>
  <section class="py-4 md:py-6 lg:py-8">
    <UContainer class="">
      <TransactionForm
        v-model="isOpen"
        v-model:transaction="transactionStore.transaction"
        :is-submitting="
          transactionStore.isLoading.createOne ||
          transactionStore.isLoading.editOne
        "
        :is-fetching="transactionStore.isLoading.getOneById"
        @submit="submitForm"
        @close="closeModal"
      />
      <UButton label="Add" icon="i-heroicons-plus" @click="isOpen = true" />
    </UContainer>
  </section>
  <section class="py-4 md:py-6 lg:py-8">
    <UContainer>
      <template v-if="transactionStore.isLoading.getAll">
        <USkeleton
          v-for="skeleton in 4"
          :key="skeleton"
          class="h-8 w-full mb-4"
        />
      </template>
      <template v-else>
        <div
          v-for="(
            transactionsByDate, date
          ) in transactionStore.transactionsGroupByDate"
          :key="date"
          class="mb-12"
        >
          <TransactionDailySummery
            :transactions="transactionsByDate"
            :date="date"
          />
          <div class="space-y-4">
            <Transaction
              v-for="transaction in transactionsByDate"
              :key="transaction.id"
              :transaction="transaction"
              :is-loading="transactionStore.isLoading.deleteOneById"
              @edit="transactionOnEdit"
              @delete="transactionOnDelete"
            />
          </div>
        </div>
      </template>
    </UContainer>
  </section>
</template>
<script setup lang="ts">
import type { TransactionDTO } from "~/types/transaction.model";

const toast = useToast();
const transactionStore = useTransactionStore();
await transactionStore.getAll();

const transactionOnEdit = async (id: number) => {
  isOpen.value = true;
  await transactionStore.getOneById(id);
};
const transactionOnDelete = async (id: number) => {
  await transactionStore.deleteOneById(id);
  toast.add({
    title: "Transaction is deleted",
    description: `Transaction width id:${id} is deleted`,
  });
  await transactionStore.getAll();
};
const isOpen = ref(false);
const closeModal = () => {
  isOpen.value = false;
  transactionStore.transaction = {} as TransactionDTO.Content;
};
const submitForm = async () => {
  try {
    if (transactionStore.transaction.id) {
      await transactionStore.editOne();
      toast.add({
        title: "Transaction is updated",
        description: `Transaction width id:${transactionStore.transaction.id} is updated`,
      });
    } else {
      await transactionStore.createOne();
      toast.add({
        title: "Transaction is created",
        description: `Transaction  is created`,
      });
    }
  } catch (error) {
    console.log((error as Error).message);
  } finally {
    closeModal();

    await transactionStore.getAll();
  }
};
</script>
