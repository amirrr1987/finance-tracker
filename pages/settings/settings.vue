<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import { assign } from "lodash";
import { transActionViewOptions } from "~/constants";
const loading = ref(false);
const user = useSupabaseUser();
const supabase = useSupabaseClient();

const schema = z.object({
  transaction_view: z.string(),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  transaction_view: user.value?.user_metadata.transaction_view ?? "undefined",
});

const appToast = useAppToast();

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  const data = {
    data: {
      transaction_view: state.transaction_view,
    },
  };
  if (state.transaction_view !== user.value?.user_metadata.transaction_view) {
    assign(data, { transaction_view: state.transaction_view });
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
    <UFormGroup
      label="Transaction view"
      name="transaction_view"
      help="Choose how ypu would like to view transactions"
    >
      <USelect
        v-model="state.transaction_view"
        :options="transActionViewOptions"
      />
    </UFormGroup>

    <UButton
      type="submit"
      label="Save"
      :loading="loading"
      :disabled="loading"
    />
  </UForm>
</template>
