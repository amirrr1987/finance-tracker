<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import { assign } from "lodash";

const loading = ref(false);
const user = useSupabaseUser();
const supabase = useSupabaseClient();

const schema = z.object({
  email: z.string().email("Invalid email"),
  fullName: z.string().min(3, "Must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  email: user.value?.email ?? undefined,
  fullName: user.value?.user_metadata.full_name ?? undefined,
});

const appToast = useAppToast();

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  const data = {
    data: {
      full_name: state.fullName,
    },
  };
  if (state.email !== user.value?.email) {
    assign(data, { email: state.email });
  }
  loading.value = true;

  try {
    const { error } = await supabase.auth.updateUser(data);
    if (error) {
      appToast.success("Profile updated", error.message);
      throw error;
    } else {
      appToast.success("Profile updated", "Profile updated successfully");
    }
  } catch (error) {
    appToast.error("Profile updated", (error as Error).message);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Full Name" name="full_name">
      <UInput v-model="state.fullName" />
    </UFormGroup>

    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormGroup>

    <UButton
      type="submit"
      label="Save"
      :loading="loading"
      :disabled="loading"
    />
  </UForm>
</template>
