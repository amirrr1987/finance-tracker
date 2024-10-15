<template>
  <UModal :ui="ui">
    <div class="flex items-center justify-between">
      <h3
        class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
      >
        {{ props.state.description }}
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
      :schema="transactionSchema"
      :state="props.state"
      class="p-4 space-y-4"
      @submit="emits('add')"
      @reset="emits('close')"
    >
      <UFormGroup label="amount" name="amount">
        <UInput
          type="number"
          :model-value="props.state.amount"
          @input="(event: Event) => emits('update:state', { ...props.state, amount: Number((event.target as HTMLInputElement).value) })"
        />
      </UFormGroup>
      <UFormGroup label="category" name="category">
        <UInput
          :model-value="props.state.category"
          @input="(event: Event) => emits('update:state', { ...props.state, category: (event.target as HTMLInputElement).value })"
        />
      </UFormGroup>
      <UFormGroup label="description" name="description">
        <UInput
          :model-value="props.state.description"
          @input="(event: Event) => emits('update:state', { ...props.state, description: (event.target as HTMLInputElement).value })"
        />
      </UFormGroup>
      <UFormGroup label="type" name="type">
        <USelect
          :model-value="props.state.type"
          :options="items"
          @change="(event: Event) => emits('update:state', { ...props.state, type: event })
          "
        />
      </UFormGroup>
      <div class="space-x-4">
        <UButton label="Submit" type="submit" />
        <UButton label="Cancel" type="reset" variant="ghost" />
      </div>
    </UForm>
  </UModal>
</template>
<script setup lang="ts">
import {
  transactionSchema,
  type TransactionDto,
} from "~/schema/transaction.schema";
interface Props {
  state: TransactionDto;
}
const props = withDefaults(defineProps<Props>(), {
  state: () => ({} as TransactionDto),
});

const emits = defineEmits(["add", "close", "update:state"]);
const items = ["Income", "Outcome"];

const ui = {
  base: "p-2",
};
</script>
