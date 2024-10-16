<template>
  <div class="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-1">
        <UIcon :name="icon" :class="iconColor" />
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
            variant="link"
          />
        </UDropdown>
      </div>
    </div>
  </div>
  <UDivider class="my-4" />
</template>
<script setup lang="ts">
import type { Transaction } from "~/types/transaction.model";

interface Props {
  transaction: Transaction;
  isLoading: boolean;
}
const props = withDefaults(defineProps<Props>(), {});
const { currency } = useCurrency(props.transaction.amount);

const isIncome = computed(() => props.transaction.type === "Income");
const icon = computed(() => {
  return isIncome.value
    ? "i-heroicons-arrow-up-right"
    : "i-heroicons-arrow-down-left";
});
const iconColor = computed(() => {
  return isIncome.value ? "text-green-600" : "text-red-600";
});

const emits = defineEmits(["delete", "get"]);

const items = [
  [
    {
      icon: "i-heroicons-pencil",
      label: "Edit",
      click: () => emits("get", props.transaction.id),
    },
    {
      icon: "i-heroicons-trash",
      label: "Delete",
      click: () => emits("delete", props.transaction.id),
    },
  ],
];
</script>
