<template>
  <UModal :ui="ui" prevent-close appear>
    <div class="flex items-center justify-between px-4 pt-2">
      <h3
        class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
      >
        <template v-if="props.transaction.id"> Edit </template>
        <template v-else> Create </template>
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
      ref="form"
      :schema="schemaCreateOne"
      :state="props.transaction"
      class="p-4 space-y-4"
      @submit.prevent="emits('submit')"
      @reset="emits('close')"
    >
      <UFormGroup label="Amount" name="amount" required>
        <USkeleton v-if="props.isFetching" class="h-8" />
        <UInput v-else v-model.number="amountComputed" type="number" placeholder="Enter amount" />
      </UFormGroup>

      <UFormGroup label="Description" name="description" required>
        <USkeleton v-if="props.isFetching" class="h-32" />
        <UTextarea v-else v-model="descriptionComputed" :rows="6" placeholder="Enter a description" />
      </UFormGroup>
      <UFormGroup label="Created at" name="createdAt" required>
        <USkeleton v-if="props.isFetching" class="h-8" />
        <UInput v-else v-model="createdAtComputed" type="date" />
      </UFormGroup>
      <div class="grid grid-cols-2 gap-x-4">
        <UFormGroup label="Category" name="category" required>
          <USkeleton v-if="props.isFetching" class="h-8" />
          <USelect v-else v-model="categoryComputed" :options="categories" placeholder="Select category" />
        </UFormGroup>
        <UFormGroup label="Type" name="type" required>
          <USkeleton v-if="props.isFetching" class="h-8" />
          <USelect v-else v-model="typeComputed" :options="types" placeholder="Select type" />
        </UFormGroup>
      </div>
      <div class="space-x-4">
        <UButton label="Submit" type="submit" :loading="props.isSubmitting" />
        <UButton label="Cancel" type="reset" variant="ghost" />
        <UButton label="Reset" variant="ghost" @click="clearForm" />
      </div>
    </UForm>
  </UModal>
</template>
<script setup lang="ts">
import { schemaCreateOne } from "~/schema/transaction.schema";
import type { TransactionDTO } from "~/types/transaction.model";
import { categories, types } from "~/constants";
interface Props {
  transaction: TransactionDTO.Content;
  isSubmitting: boolean;
  isFetching: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  transaction: () => ({}) as TransactionDTO.Content,
  isSubmitting: false,
  isFetching: false,
});
const form = ref();

const clearForm = () => {
  form.value.clear();
  emits("update:transaction", {});
};
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

const createdAtComputed = computed({
  get: () => props.transaction.createdAt,
  set: (event) => {
    return emits("update:transaction", {
      ...props.transaction,
      createdAt: event,
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
