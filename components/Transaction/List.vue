<template>
  <section class="py-4 md:py-6 lg:py-8">
    <UModal v-model="isOpen">
      <UForm
        :schema="transactionSchemaOnCreate"
        :state="transactionStore.transaction"
        class="p-4 space-y-4"
        @submit="submitForm"
        @reset="closeModal"
      >
        <UFormGroup label="amount" name="amount">
          <UInput v-model="transactionStore.transaction.amount" type="number" />
        </UFormGroup>
        <UFormGroup label="category" name="category">
          <UInput v-model="transactionStore.transaction.category" />
        </UFormGroup>
        <UFormGroup label="description" name="description">
          <UInput v-model="transactionStore.transaction.description" />
        </UFormGroup>
        <UFormGroup label="type" name="type">
          <USelect
            v-model="transactionStore.transaction.type"
            :options="['Income', 'Expose']"
          />
        </UFormGroup>
        <div class="space-x-4">
          <UButton
            label="Submit"
            type="submit"
            :loading="
              transactionStore.isLoading.createOne ||
              transactionStore.isLoading.editOne
            "
          />
          <UButton label="Cancel" type="reset" variant="ghost" />
        </div>
      </UForm>
    </UModal>
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
import { transactionSchemaOnCreate } from "~/schema/transaction.schema";
import type { Transaction } from "~/types/transaction.model";

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
  setTimeout(() => {
    transactionStore.transaction = {} as Transaction;
  }, 300);
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
    await transactionStore.getAll();
    closeModal();
  }
};
</script>
