<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import { debounce } from "lodash";
import dayjs from "dayjs";
const loading = ref(false);
const isDisable = ref(false);
const user = useSupabaseUser();
const supabase = useSupabaseClient();
const uploading = ref(false);
const fileInput = ref();
const { url } = useAvatarUrl();

const schema = z.object({
  avatar: z.string(),
  size: z.number().max(20480),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  avatar: user.value?.user_metadata.avatar_url ?? "undefined",
  size: 0,
});

const appToast = useAppToast();

const showButton = ref(false);
const toggleButton = debounce(() => {
  showButton.value = !showButton.value;
}, 1000);

type FileBody =
  | ArrayBuffer
  | ArrayBufferView
  | Blob
  | Buffer
  | File
  | FormData
  | NodeJS.ReadableStream
  | ReadableStream<Uint8Array>
  | URLSearchParams
  | string;
interface TargetFile {
  name: string;
  file: FileBody;
}
const targetFile = ref<TargetFile>({
  name: "",
  file: "",
});

const isBig = ref(false);
const getImage = (e) => {
  const file = e[0];
  if (!file) return;
  isBig.value = false;
  isDisable.value = false;
  if (file.size > 20480) {
    isBig.value = true;
    isDisable.value = isBig.value;
  }
  targetFile.value.file = file;
  targetFile.value.name = `avatar-${dayjs().format("YYYY-MM-DD-hh-mm-ss")}.${file.name.split(".").pop()}`;
};
const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  uploading.value = true;
  const currentAvatarUrl = user.value?.user_metadata.avatar_url;
  try {
    const { error: storageError } = await supabase.storage
      .from("avatars")
      .upload(targetFile.value.name, targetFile.value.file);
    if (storageError) {
      appToast.error("Upload", storageError.message);
      throw storageError;
    }

    if (currentAvatarUrl) {
      const { error } = await supabase.storage
        .from("avatars")
        .remove([currentAvatarUrl]);
      if (error) throw error;
    }

    fileInput.value.input.value = null;

    loading.value = true;
    isDisable.value = true;
    const { error: authError } = await supabase.auth.updateUser({
      data: {
        avatar_url: targetFile.value.name,
      },
    });
    if (authError) {
      throw authError;
    }
    appToast.success("Setting updated", "Setting updated successfully");
  } catch (error) {
    appToast.error("Uploading", (error as Error).message);
  } finally {
    uploading.value = false;
    loading.value = false;
    isDisable.value = false;
  }
};

watch(state, () => {
  if (user.value?.user_metadata.transaction_view !== state.avatar) {
    showButton.value = true;
    toggleButton();
  }
});
</script>

<template>
  <UForm
    :schema="schema"
    :state="state"
    class="space-y-4"
    @submit.prevent="onSubmit"
  >
    <UAvatar :src="`${url}`" size="3xl" />
    <NuxtImg src="" />
    <UFormGroup
      label="Avatar"
      name="avatar"
      :error="isBig && `Your image is big size than 200kb`"
    >
      <UInput
        ref="fileInput"
        v-model="state.avatar"
        type="file"
        :loading="uploading"
        accept="image/jpeg, image/png, image/webp, image/gif"
        @change="getImage"
      />
    </UFormGroup>

    <UButton
      type="submit"
      label="Save"
      :loading="loading"
      :disabled="isDisable"
    />
  </UForm>
</template>
