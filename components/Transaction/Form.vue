<template>
  <UModal :ui="ui" prevent-close>
    <div class="flex items-center justify-between">
      <h3
        class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
      >
        {{ props.transaction.description }}
        {{ descriptionComputed }}
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
      <UFormGroup label="Amount" name="amount" required>
        <UInput v-model.number="amountComputed" type="number" />
      </UFormGroup>

      <UFormGroup label="Description" name="description" required>
        <UTextarea v-model="descriptionComputed" />
      </UFormGroup>
      <div class="grid grid-cols-2 gap-x-4">
        <UFormGroup label="Category" name="category" required>
          <USelect v-model="categoryComputed" :options="categories" />
        </UFormGroup>
        <UFormGroup label="Type" name="type" required>
          <USelect v-model="typeComputed" :options="types" />
        </UFormGroup>
      </div>
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
import { categories, types } from "~/constants";
interface Props {
  transaction: Transaction;
  isLoading: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  transaction: () => ({}) as Transaction,
  isLoading: false,
});

const emits = defineEmits(["submit", "close", "update:transaction"]);

const ui = {
  base: "p-2",
};

const amountComputed = computed({
  get: () => props.transaction.amount,
  set: (event) => {
    return emits("update:transaction", {
      ...props.transaction,
      amount: event,
    });
  },
});
const descriptionComputed = computed({
  get: () => props.transaction.description,
  set: (event) => {
    return emits("update:transaction", {
      ...props.transaction,
      description: event,
    });
  },
});

const typeComputed = computed({
  get: () => props.transaction.type,
  set: (event) => {
    return emits("update:transaction", { ...props.transaction, type: event });
  },
});

const categoryComputed = computed({
  get: () => props.transaction.category,
  set: (event) => {
    return emits("update:transaction", {
      ...props.transaction,
      category: event,
    });
  },
});
</script>
