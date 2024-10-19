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
        :amount="300"
        :last-amount="400"
        :loading="transactionStore.isLoading.getAll"
      />
      <Trend
        color="red"
        title="Expense"
        :amount="9900"
        :last-amount="1"
        :loading="transactionStore.isLoading.getAll"
      />
      <Trend
        color="green"
        title="Income"
        :amount="4000"
        :last-amount="3000"
        :loading="transactionStore.isLoading.getAll"
      />
      <Trend
        color="green"
        title="Income"
        :amount="4000"
        :last-amount="3000"
        :loading="transactionStore.isLoading.getAll"
      />
    </UContainer>
  </section>
</template>
<script setup lang="ts">
const transactionStore = useTransactionStore();
</script>
