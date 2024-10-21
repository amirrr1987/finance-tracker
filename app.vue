<template>
  <NuxtRouteAnnouncer />
  {{ transactions.transactionList }}
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UNotifications />
</template>
<script setup lang="ts">
const transactions =  useTransactions();
await transactions.getAll();
console.log(1111111111);
console.log(transactions.transactionList.value);

console.log(1111111111);
</script>
