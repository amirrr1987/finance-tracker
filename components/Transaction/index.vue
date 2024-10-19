<template>
  <div class="space-y-4">
    <template v-for="transaction in props.transactions" :key="transaction.id">
      <div class="flex justify-between">
        <div class="flex gap-x-4 items-center">
          <UIcon
            :name="getIcon(transaction.type)"
            :class="getIconColor(transaction.type)"
          />
          <h3>{{ transaction.description }}</h3>
        </div>
        <div class="flex items-center">
          <div>{{ useCurrency(transaction.amount).currency }}</div>
          <ClientOnly>
            <UDropdown
              :items="getDropdownItems(transaction.id)"
              :popper="{ placement: 'bottom-start' }"
            >
              <UButton
                trailing-icon="i-heroicons-ellipsis-horizontal"
                variant="link"
                :loading="
                  selectedTransactionId === transaction.id
                    ? props.isLoading
                    : false
                "
              />
            </UDropdown>
          </ClientOnly>
        </div>
      </div>
      <UDivider />
    </template>
  </div>
</template>
<script setup lang="ts">
import type { Transaction } from "~/types/transaction.model";

interface Props {
  transactions: Transaction[];
  isLoading: boolean;
}

const props = withDefaults(defineProps<Props>(), {});

const getIcon = (type: string) => {
  return type === "Income"
    ? "i-heroicons-arrow-up-right"
    : "i-heroicons-arrow-down-left";
};

const getIconColor = (type: string) => {
  return type === "Income" ? "text-green-600" : "text-red-600";
};

const emits = defineEmits(["edit", "delete"]);
const selectedTransactionId = ref(-1);
const getDropdownItems = (id: number) => [
  [
    {
      icon: "i-heroicons-pencil",
      label: "Edit",
      click: () => {
        selectedTransactionId.value = id;
        emits("edit", id);
      },
    },
    {
      icon: "i-heroicons-trash",
      label: "Delete",
      click: () => {
        selectedTransactionId.value = id;
        emits("delete", id);
      },
    },
  ],
];
</script>
