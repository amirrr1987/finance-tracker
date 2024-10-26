<template>
  <UCard v-if="!success" header="signin to finince tracker">
    <UForm :schema="{}" :state="{}" :ui="cardUi">
      <UFormGroup
        label="Email"
        name="email"
        required
        help="You will receive an email width the confirmation link"
      >
        <UInput type="email" placeholder="Enter email" required />
      </UFormGroup>
      <UFormGroup label="Password" name="password" required>
        <UInput type="password" placeholder="Enter password" required />
      </UFormGroup>
      <UButton type="submit" label="Login" @click="success = true" />
    </UForm>
  </UCard>
  <UCard v-else header="Email has been send.."  :ui="cardUi">
    <p>
      We have send an email to <strong>mas@mm.com</strong>width a link to
      signing
    </p>
    <p>Important the link has been expired</p>
  </UCard>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "auth",
});
const success = ref<boolean>(false);

const cardUi = {
  body: {
    base: "text-center",
  },
};
</script>
