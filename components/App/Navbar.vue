<template>
  <nav
    class="py-2 sm:py-3 lg:py-4 shadow bg-primary dark:bg-primary-800 text-white"
  >
    <UContainer class="flex justify-between items-center">
      <NuxtLink to="/">Fiance Tracker</NuxtLink>
      <div class="flex gap-x-4">
        <UAvatar
          src="https://avatars.githubusercontent.com/u/739984?v=4"
          alt="Avatar"
        />
        <ClientOnly>
          <USelect
            v-model="colorMode.preference"
            :options="['light', 'dark', 'sepia']"
          />
          <UButton />
          <AuthSignOut />
        </ClientOnly>
      </div>
    </UContainer>
  </nav>
</template>
<script setup lang="ts">
const colorMode = useColorMode();
</script>
<style>
.light {
  background-color: #fefefe;
  color: #091a28;
}
.dark {
  background-color: #091a28;
  color: #f1f1f1;
}
.sepia {
  background-color: #f3dfad;
  color: #5b4636;
}
</style>
