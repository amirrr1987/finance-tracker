<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UNotifications />
</template>
<script setup lang="ts">
const transactionStore = useTransactionStore();
await transactionStore.getAll();
</script>
