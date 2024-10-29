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
        :amount="transactionStore.incomeListTotal"
        :last-amount="400"
        :loading="transactionStore.isLoading.getAll"
      />
      <Trend
        color="red"
        title="Expense"
        :amount="transactionStore.expenseListTotal"
        :last-amount="1"
        :loading="transactionStore.isLoading.getAll"
      />
      <Trend
        color="green"
        title="Income"
        :amount="transactionStore.incomeListTotal"
        :last-amount="3000"
        :loading="transactionStore.isLoading.getAll"
      />
      <Trend
        color="green"
        title="Income"
        :amount="transactionStore.expenseListTotal"
        :last-amount="3000"
        :loading="transactionStore.isLoading.getAll"
      />
    </UContainer>
  </section>
  <section class="py-4 md:py-6 lg:py-8">
    <UContainer class="text-center">
      <h3 class="text-2xl font-extrabold mb-2">Transactions</h3>
      <p class="text-gray-600 dark:text-gray-400">
        You has {{ transactionStore.incomeListCount }} Incomes and
        {{ transactionStore.expenseCount }} expenses this period
      </p>
    </UContainer>
  </section>
</template>
<script setup lang="ts">
const transactionStore = useTransactionStore();
</script>
