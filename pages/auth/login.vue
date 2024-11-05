<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import { authSchema } from "~/schema/auth.schema";
import type { AuthDTO } from "~/types/auth.model";
const schema = z.object({
  email: authSchema.login.request,
});

type Schema = {
  email: AuthDTO.Login.Request;
};

const state = reactive({
  email: undefined,
});
// const auth = useAuth();
const isPending = ref<boolean>(false);
const supabse = useSupabaseClient();
const toast = useToast();
const runtimeConfig = useRuntimeConfig() 
const isSuccess = ref<boolean>(false);
async function onSubmit(event: FormSubmitEvent<Schema>) {
  // auth.email.value = state.email ?? "";
  // await auth.submit();
  isPending.value = true;
  try {
    const { error } = await supabse.auth.signInWithOtp({
      email: state.email ?? "",
      options: {
        emailRedirectTo: `${runtimeConfig.public.baseUrl}/auth/confirm`  ,
      },
    });
    if (error) {
      toast.add({
        title: "Error authentication",
        description: error.message,
        color: "red",
      });
    }
    isSuccess.value = true;
  } catch (error) {
    console.log("catch");
    console.log(error);
    console.log("catch");
  } finally {
    isPending.value = false;
  }
}
definePageMeta({
  layout: "auth",
});
</script>

<template>
  <UForm
    v-if="!isSuccess"
    :schema="schema"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormGroup>

    <UButton type="submit" :loading="isPending" :disabled="isPending">
      Submit
    </UButton>
  </UForm>
  <UCard v-else>
    {{ state.email }}
  </UCard>
</template>
