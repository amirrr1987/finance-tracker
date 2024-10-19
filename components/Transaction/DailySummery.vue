<template>
  <div class="flex justify-between text-gray-400">
    <div class="ms-8">
      {{ props.date }}
    </div>
    <div class="me-8">
      {{ currency }}
    </div>
  </div>
  <UDivider class="mb-4 mt-2" />
</template>
<script setup lang="ts">
import type { Transaction } from "~/types/transaction.model";

interface Props {
  transactions: Transaction[];
  date: string;
}
const props = withDefaults(defineProps<Props>(), {});

const sum = computed(() => {
  let sum = 0;
  for (const transaction of props.transactions) {
    if (transaction.type === "Income") {
      sum += transaction.amount;
    } else {
      sum -= transaction.amount;
    }
  }
  return sum;
});
const { currency } = useCurrency(sum);
</script>
