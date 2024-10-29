<template>
  <section class="py-4 sm:py-6 lg:py-8">
    <UContainer class="grid grid-cols-6 gap-8">
      <UVerticalNavigation :links="links" class="col-span-2" />
      <div class="col-span-4">
        <NuxtPage />
      </div>
    </UContainer>
  </section>
</template>
<script setup lang="ts">
const links = [
  {
    label: "Profile",
    to: "/settings/profile",
  },
  {
    label: "Avatar",
    to: "/settings/avatar",
  },
  {
    label: "Settings",
    to: "/settings/settings",
  },
];
</script>
