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
  background-color: #fff;
  color: hsla(0, 0%, 0%, 0.479);
}
.dark {
  background-color: #091a28;
  color: #ebf4f1;
}
.sepia {
  background-color: #f1e7d0;
  color: #433422;
}
</style>
