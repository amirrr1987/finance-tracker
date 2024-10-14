<template>
  <div>
    <section class="py-4 md:py-6 lg:py-8">
      <UContainer :ui="{ base: 'flex justify-between' }">
        <h1 class="text-4xl font-bold">Summery</h1>
        <USelectMenu
          v-model="selectedView"
          :options="transActionViewOptions"
          placeholder="Select View"
        />
      </UContainer>
    </section>
    <TrendList />
    <TransactionList />
  </div>
</template>
<script setup lang="ts">
import { transActionViewOptions } from "~/constants";
const selectedView = ref(transActionViewOptions[1])
</script>
