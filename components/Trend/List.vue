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
        :amount="inComesTotal"
        :last-amount="400"
        :loading="transactionStore.isLoading.getAll"
      />
      <Trend
        color="red"
        title="Expense"
        :amount="expenseTotal"
        :last-amount="1"
        :loading="transactionStore.isLoading.getAll"
      />
      <Trend
        color="green"
        title="Income"
        :amount="inComesTotal"
        :last-amount="3000"
        :loading="transactionStore.isLoading.getAll"
      />
      <Trend
        color="green"
        title="Income"
        :amount="expenseTotal"
        :last-amount="3000"
        :loading="transactionStore.isLoading.getAll"
      />
    </UContainer>
  </section>
  <section class="py-4 md:py-6 lg:py-8">
    <UContainer class="text-center">
      <h3 class="text-2xl font-extrabold mb-2">Transactions</h3>
      <p class="text-gray-600 dark:text-gray-400">
        You has {{ inComeCount }} Incomes and {{ expenseCount }} expenses this
        period
      </p>
    </UContainer>
  </section>
</template>
<script setup lang="ts">
const transactionStore = useTransactionStore();

const inComes = computed(() =>
  transactionStore.transactions.filter((i) => i.type === "Income")
);
const inComeCount = computed(() => inComes.value.length);
const inComesTotal = computed(() =>
  inComes.value.reduce((sum, transaction) => sum + transaction.amount, 0)
);
const expenses = computed(() =>
  transactionStore.transactions.filter((i) => i.type === "Expense")
);
const expenseCount = computed(() => expenses.value.length);
const expenseTotal = computed(() =>
  expenses.value.reduce((sum, transaction) => sum + transaction.amount, 0)
);
</script>
