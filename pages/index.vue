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
          :loading="false"
        />
        <Trend
          color="red"
          title="Income"
          :amount="9900"
          :last-amount="1"
          :loading="false"
        />
        <Trend
          color="green"
          title="Income"
          :amount="4000"
          :last-amount="3000"
          :loading="true"
        />
        <Trend
          color="green"
          title="Income"
          :amount="4000"
          :last-amount="3000"
          :loading="true"
        />
      </UContainer>
    </section>
  </div>
</template>
<script setup lang="ts">
import { transActionViewOptions } from "~/constants";
const selectedView = ref(transActionViewOptions[1]);
</script>
