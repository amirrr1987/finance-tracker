<template>
  <section class="py-4 md:py-6 lg:py-8">
    <UContainer
      :ui="{
        base: 'grid md:grid-cols-2 lg:grid-cols-4  gap-4 md:gap-6 lg:gap-8',
      }"
    >
      <Trend
        color="green"
        title="Income"
        :amount="props.inComesTotal"
        :last-amount="400"
        :loading="props.isLoading"
      />
      <Trend
        color="red"
        title="Expense"
        :amount="props.expenseTotal"
        :last-amount="1"
        :loading="props.isLoading"
      />
      <Trend
        color="green"
        title="Income"
        :amount="props.inComesTotal"
        :last-amount="3000"
        :loading="props.isLoading"
      />
      <Trend
        color="green"
        title="Income"
        :amount="props.expenseTotal"
        :last-amount="3000"
        :loading="props.isLoading"
      />
    </UContainer>
  </section>
  <section class="py-4 md:py-6 lg:py-8">
    <UContainer class="text-center">
      <h3 class="text-2xl font-extrabold mb-2">Transactions</h3>
      <p class="text-gray-600 dark:text-gray-400">
        You has {{ props.inComeCount }} Incomes and
        {{ props.expenseCount }} expenses this period
      </p>
    </UContainer>
  </section>
</template>
<script setup lang="ts">
interface Props {
  inComeCount: number;
  expenseCount: number;
  inComesTotal: number;
  expenseTotal: number;
  isLoading: boolean;
}
const props = withDefaults(defineProps<Props>(), {});
</script>
