<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import { authSchema } from "~/schema/auth.schema";
import type { AuthDTO } from "~/types/auth.model";
const schema = z.object({
  email: authSchema.login.request,
  password: z.string().min(4, "Must be at least 4 characters"),
});

type Schema = {
  email: AuthDTO.Login.Request;
};

const state = reactive({
  email: undefined,
  password: undefined,
});
const auth = useAuth();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  console.log(event.data);
  auth.email.value = state.email ?? "";
  await auth.submit();
}
definePageMeta({
  layout: "auth",
});
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormGroup>

    <UButton type="submit" :loading="auth.pending.value === 'pending'">
      Submit
    </UButton>
  </UForm>
</template>
