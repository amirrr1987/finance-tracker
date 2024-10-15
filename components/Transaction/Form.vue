<template>
  <UModal>
    <UForm
      :schema="transactionSchema"
      :state="props.state"
      class="p-4 space-y-4"
      @submit="emits('add')"
    >
      <UFormGroup label="amount" name="amount">
        <UInput
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
      <UButton label="add" type="submit" />
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

const emits = defineEmits(["add", "update:state"]);

const items = ["Income", "Outcome"];
</script>
