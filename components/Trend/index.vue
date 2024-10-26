<template>
  <div class="border p-4 rounded">
    <div
      class="font-bold mb-2"
      :class="
        trendingUp
          ? 'text-green-600 dark:text-green-400'
          : 'text-red-600 dark:text-red-400'
      "
    >
      {{ title }}
    </div>
    <div class="text-2xl font-extrabold text-back dark:text-white mb-2">
      <USkeleton v-if="loading" class="h-8 w-full" />
      <div v-else>{{ currency }}</div>
    </div>

    <div>
      <USkeleton v-if="loading" class="h-6 w-full" />
      <div v-else class="flex space-x-1 items-center text-sm">
        <UIcon
          :name="icon"
          class="w-6 h-6"
          :class="
            trendingUp
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-600 dark:text-red-400'
          "
        />
        <div class="text-xs text-gray-500 dark:gray-400">
          {{ percentTrend }}% vs last period
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  title: string;
  amount: number;
  lastAmount: number;
  color: string;
  loading: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  title: "",
  amount: 0,
  lastAmount: 0,
  color: "",
  loading: false,
});
const { amount, lastAmount, loading, color, title } = toRefs(props);

const trendingUp = computed(() => {
  return amount.value >= lastAmount.value ? true : false;
});

const icon = computed(() => {
  return trendingUp.value
    ? "i-heroicons-arrow-trending-up"
    : "i-heroicons-arrow-trending-down";
});
const { currency } = useCurrency(amount);
const percentTrend = computed(() => {
  if (amount.value === 0 || lastAmount.value === 0) return "-";

  const bigger = Math.max(amount.value, lastAmount.value);
  const lower = Math.min(amount.value, lastAmount.value);
  const ratio = (bigger - lower) / 100;
  return Math.ceil(ratio);
});
</script>
