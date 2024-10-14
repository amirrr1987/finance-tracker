<template>
  <section class="py-4 md:py-6 lg:py-8">
    <UContainer>
      <Transaction
        v-for="transaction in transactions"
        :key="transaction.id"
        :transaction="transaction"
      />
    </UContainer>
  </section>
</template>
<script setup lang="ts">
import type { Transaction } from "~/types/transactionModel";

const supabase = useSupabaseClient();

const { data: transactions } = await useAsyncData<Transaction[]>(
  "transactions",
  async () => {
    const { data, error } = await supabase.from("transactions").select();
    if (error) return [];
    return data;
  }
);
</script>
