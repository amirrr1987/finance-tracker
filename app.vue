<template>
  <div>
    <div>
      <div>error: {{ fetcher.error?.value }}</div>
      <div>status: {{ fetcher.status?.value }}</div>
      <div>pending: {{ fetcher.pending?.value }}</div>
    </div>
    <UButton @click="fetcher.execute">execute</UButton>
    <UButton @click="fetcher.refresh">refresh</UButton>
    <UButton @click="fetcher.clear">clear</UButton>
    <div
      v-for="(item, index) in fetcher.data"
      :key="index"
      class="bg-red-500 mt-10"
    >
      {{ item }}
    </div>
  </div>
</template>

<script setup lang="ts">
const fetcher = await useFetcher("/api/v1/transaction");
</script>
