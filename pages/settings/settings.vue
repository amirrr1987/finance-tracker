<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import { assign, debounce } from "lodash";
import { transActionViewOptions } from "~/constants";
const loading = ref(false);
const user = useSupabaseUser();
const supabase = useSupabaseClient();

const schema = z.object({
  transaction_view: z.enum(transActionViewOptions),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  transaction_view: user.value?.user_metadata.transaction_view ?? "undefined",
});

const appToast = useAppToast();

const hideButton = debounce(() => {
  showButton.value = false;
}, 1000);

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  const data = {
    data: {
      transaction_view: event.data.transaction_view,
    },
  };
  if (
    event.data.transaction_view !== user.value?.user_metadata.transaction_view
  ) {
    assign(data, { transaction_view: event.data.transaction_view });
  }
  loading.value = true;

  try {
    const { error } = await supabase.auth.updateUser(data);
    if (error) {
      appToast.error("Error", error.message);
      throw error;
    } else {
      appToast.success("Setting updated", "Setting updated successfully");
      hideButton();
    }
  } catch (error) {
    appToast.error("Error", (error as Error).message);
  } finally {
    loading.value = false;
  }
};

const showButton = ref(false);
watch(state, () => {
  if (user.value?.user_metadata.transaction_view !== state.transaction_view) {
    showButton.value = true;
  }
});
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit.prevent="onSubmit">
    <UFormGroup
      label="Transaction view"
      name="transaction_view"
      help="Choose how ypu would like to view transactions"
    >
      <USelect
        v-model="state.transaction_view"
        :options="[...transActionViewOptions]"
      />
    </UFormGroup>

    <UButton
      v-if="showButton"
      type="submit"
      label="Save"
      :loading="loading"
      :disabled="loading"
    />
  </UForm>
</template>
