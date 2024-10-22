<template>
  <section class="py-4 md:py-6 lg:py-8">
    <UContainer class="">
      {{ transactionStore.getOneById.loading.loading }}
      {{ transactionStore.updateOneById.loading.loading }}
      {{ transactionStore.createOne.loading.loading }}
      <TransactionForm
        v-model="isOpen"
        v-model:transaction="transactionStore.transaction"
        :is-submitting="transactionStore.updateOneById.loading.loading"
        :is-fetching="transactionStore.getOneById.loading.loading"
        @submit="submitForm"
        @close="closeModal"
      />
      <UButton label="Add" icon="i-heroicons-plus" @click="isOpen = true" />
    </UContainer>
  </section>
  <section class="py-4 md:py-6 lg:py-8">
    <UContainer>
      <template v-if="transactionStore.getAll.loading.loading">
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
              :is-loading="transactionStore.deleteOneById.loading.loading"
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

const transactionStore = useTransactionStore();
await transactionStore.getAll.fetch();
const toast = useToast();
const isOpen = ref(false);
const closeModal = () => {
  isOpen.value = false;
  transactionStore.transaction = {} as TransactionDTO.Content;
};

const submitForm = async () => {
  await transactionStore.updateOneById.validate(1)
  await transactionStore.updateOneById.fetch()
  // try {
  //   if (transactionStore.transaction.id) {
  //     await transactionStore.updateOneById.fetch();
  //     toast.add({
  //       title: "Transaction is updated",
  //       description: `Transaction width id:${transactionStore.transaction.id} is updated`,
  //     });
  //   } else {
  //     await transactionStore.createOne.fetch();
  //     toast.add({
  //       title: "Transaction is created",
  //       description: `Transaction  is created`,
  //     });
  //   }
  // } catch (error) {
  //   console.log((error as Error).message);
  // } finally {
  //   closeModal();

  //   await transactionStore.getAll.fetch();
  // }
};

const transactionOnEdit = async (id: number) => {
  isOpen.value = true;
  await transactionStore.getOneById.fetch(id);
};

const transactionOnDelete = async (id: number) => {
  await transactionStore.deleteOneById.fetch(id);
  toast.add({
    title: "Transaction is deleted",
    description: `Transaction width id:${id} is deleted`,
  });
  await transactionStore.getAll.fetch();
};
</script>
