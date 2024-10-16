<template>
  <div class="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8 text-gray-400 mb-4">
    <div class="flex items-center justify-between">
      {{ props.date }}
    </div>
    <div class="flex gap-x-4 justify-end">
      {{ currency }}
    </div>
  </div>
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
