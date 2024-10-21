<template>
  <div class="flex items-center gap-x-2">
    <div class="flex-1 flex gap-x-4 items-center">
      <UIcon :name="icon" :class="iconColor" />
      <h3>{{ props.transaction.description }}</h3>
    </div>
    <UBadge variant="subtle">
      {{ props.transaction.category }}
    </UBadge>
    <div>{{ currency }}</div>
    <ClientOnly>
      <UDropdown :items="dropdownItems" :popper="{ placement: 'bottom-start' }">
        <UButton
          trailing-icon="i-heroicons-ellipsis-horizontal"
          variant="link"
          :loading="
            selectedTransactionId === transaction.id ? props.isLoading : false
          "
        />
      </UDropdown>
    </ClientOnly>
  </div>
  <UDivider />
</template>
<script setup lang="ts">
import type { TransactionDTO } from "~/types/transaction.model";

interface Props {
  transaction: TransactionDTO.Content;
  isLoading: boolean;
}

const props = withDefaults(defineProps<Props>(), {});

const isIncome = computed(() => props.transaction.type === "Income");
const icon = computed(() => {
  return isIncome.value
    ? "i-heroicons-arrow-up-right"
    : "i-heroicons-arrow-down-left";
});

const iconColor = computed(() => {
  return isIncome.value ? "text-green-600" : "text-red-600";
});

const currency = computed(() => useCurrency(props.transaction.amount).currency);

const emits = defineEmits(["edit", "delete"]);
const selectedTransactionId = ref(-1);
const dropdownItems = computed(() => {
  return [
    [
      {
        icon: "i-heroicons-pencil",
        label: "Edit",
        click: () => {
          selectedTransactionId.value = props.transaction.id;
          emits("edit", props.transaction.id);
        },
      },
      {
        icon: "i-heroicons-trash",
        label: "Delete",
        click: () => {
          selectedTransactionId.value = props.transaction.id;
          emits("delete", props.transaction.id);
        },
      },
    ],
  ];
});
</script>
