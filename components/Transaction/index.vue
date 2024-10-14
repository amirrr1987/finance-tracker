<template>
  <div class="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-1">
        <UIcon name="i-heroicons-arrow-up-right" class="text-green-600" />
        <div>{{ props.transaction.description }}</div>
      </div>
      <div>
        <UBadge v-if="props.transaction.category" color="white">
          {{ props.transaction.category }}
        </UBadge>
      </div>
    </div>
    <div class="flex gap-x-4 justify-end">
      <div>{{ currency }}</div>
      <div>
        <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
          <UButton
            color="white"
            trailing-icon="i-heroicons-ellipsis-horizontal"
          />
        </UDropdown>
      </div>
    </div>
  </div>
  <UDivider class="my-2" />
</template>
<script setup lang="ts">
import type { Transaction } from "~/types/transactionModel";

interface Props {
  transaction: Transaction;
}
const props = withDefaults(defineProps<Props>(), {});
const { currency } = useCurrency(props.transaction.amount);

const items = [
  [
    {
      icon: "i-heroicons-pencil",
      label: "Edit",
      click: () => console.log("Edit", props.transaction.id),
    },
    {
      icon: "i-heroicons-trash",
      label: "Delete",
      click: () => console.log("Delete", props.transaction.id),
    },
  ],
];
</script>
