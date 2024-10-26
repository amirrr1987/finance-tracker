<template>
  <div class="flex items-center gap-x-2">
    <div class="flex-1 flex gap-x-4 items-center">
      <UIcon :name="icon" :class="iconColor" />
      <h3>{{ _.truncate(props.transaction.description, { length: 50 }) }}</h3>
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
          :loading="isLoading"
        />
      </UDropdown>
    </ClientOnly>
  </div>
  <UDivider />
</template>
<script setup lang="ts">
import type { TransactionDTO } from "~/types/transaction.model";
import _ from "lodash";
import type { AsyncDataRequestStatus } from "#app";

interface Props {
  transaction: TransactionDTO.Content;
  status: AsyncDataRequestStatus;
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

const isLoading = computed(() => {
  if (selectedTransactionId.value !== props.transaction.id) {
    return false;
  }
  if (props.status === "pending") {
    return true;
  } else {
    return false;
  }
});
</script>
