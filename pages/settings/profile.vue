<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="submit">
    <UFormGroup label="Full Name" name="name">
      <UInput v-model="state.name" />
    </UFormGroup>

    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormGroup>

    <UButton
      type="submit"
      color="black"
      variant="solid"
      label="save"
      :loading="loading"
    />
  </UForm>
</template>
<script setup lang="ts">
import { Suspense } from "vue";
import { z } from "zod";

const loading = ref(false);
onMounted(async () => {
  const user = await useSupabaseUser();
  state.value.email = user.value?.email ?? "";
});
const state = ref({
  email: "",
  name: "",
});

const schema = z.object({
  email: z.string().email(),
  name: z.string(),
});

const submit = async () => {};
</script>
