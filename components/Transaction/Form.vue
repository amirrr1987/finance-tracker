<template>
  <UModal :ui="ui" prevent-close>
    <div class="flex items-center justify-between">
      <h3
        class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
      >
        {{ props.transaction.description }}
      </h3>
      <UButton
        color="gray"
        variant="ghost"
        icon="i-heroicons-x-mark-20-solid"
        class="-my-1"
        @click="emits('close')"
      />
    </div>
    <UForm
      :schema="transactionSchemaOnCreate"
      :state="props.transaction"
      class="p-4 space-y-4"
      @submit="emits('submit')"
      @reset="emits('close')"
    >
      <UFormGroup label="amount" name="amount">
        <UInput
          type="number"
          :model-value="props.transaction.amount"
          @input="
            (event: Event) =>
              emits('update:transaction', {
                ...props.transaction,
                amount: Number((event.target as HTMLInputElement).value),
              })
          "
        />
      </UFormGroup>
      <UFormGroup label="category" name="category">
        <UInput
          :model-value="props.transaction.category"
          @input="
            (event: Event) =>
              emits('update:transaction', {
                ...props.transaction,
                category: (event.target as HTMLInputElement).value,
              })
          "
        />
      </UFormGroup>
      <UFormGroup label="description" name="description">
        <UInput
          :model-value="props.transaction.description"
          @input="
            (event: Event) =>
              emits('update:transaction', {
                ...props.transaction,
                description: (event.target as HTMLInputElement).value,
              })
          "
        />
      </UFormGroup>
      <UFormGroup label="type" name="type">
        <USelect
          :model-value="props.transaction.type"
          :options="items"
          @change="
            (event: Event) =>
              emits('update:transaction', { ...props.transaction, type: event })
          "
        />
      </UFormGroup>
      <div class="space-x-4">
        <UButton label="Submit" type="submit" :loading="isLoading" />
        <UButton label="Cancel" type="reset" variant="ghost" />
      </div>
    </UForm>
  </UModal>
</template>
<script setup lang="ts">
import { transactionSchemaOnCreate } from "~/schema/transaction.schema";
import type { Transaction } from "~/types/transaction.model";
interface Props {
  transaction: Transaction;
  isLoading: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  transaction: () => ({}) as Transaction,
  isLoading: false,
});

const emits = defineEmits(["submit", "close", "update:transaction"]);
const items = ["Income", "Expense"];

const ui = {
  base: "p-2",
};
</script>
