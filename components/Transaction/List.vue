<template>
  <section class="">
    <UContainer>
      <div class="mb-4 flex gap-4">
        <UButton @click="getAll.execute">execute</UButton>
        <UButton @click="getAll.clear">clear</UButton>
        <UButton @click="getAll.refresh">refresh</UButton>
      </div>
      <div>{{ getAll.status.value }}</div>
      <div>{{ getAll.pending.value }}</div>
      <template v-if="getAll.status.value === 'pending'">
        <USkeleton v-for="item in 4" :key="item" class="h-20 mb-4" />
      </template>
      <template v-if="getAll.status.value === 'success'">
        <div class="space-y-4">
          <Transaction
            v-for="t in getAll.data.value"
            :key="t.id"
            :transaction="t"
            :is-loading="false"
          />
        </div>
      </template>
    </UContainer>
  </section>
</template>
<script setup lang="ts">
const transaction = useTransactions();
const getAllData = async () => await transaction.getAllData();
const getAll = await getAllData();
</script>
