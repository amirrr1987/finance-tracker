<template>
  <nav
    class="py-2 sm:py-3 lg:py-4 shadow bg-primary dark:bg-primary-800 text-white"
  >
    <UContainer class="flex justify-between items-center">
      <NuxtLink to="/">Fiance Tracker</NuxtLink>
      <div class="flex gap-x-4">
        <ClientOnly>
          <USelectMenu
            v-model="colorMode.preference"
            :options="items"
            option-attribute="value"
            value-attribute="value"
          >
            <template #leading>
              <UIcon :name="getIcon(colorMode.preference)" class="w-5 h-5" />
            </template>
          </USelectMenu>
          <AuthSignOut />
        </ClientOnly>
      </div>
    </UContainer>
  </nav>
</template>
<script setup lang="ts">
const colorMode = useColorMode();
const getIcon = (value: string) => {
  const index = items.findIndex((item) => item.value === value);
  return items[index].icon;
};
const items = [
  {
    value: "light",
    icon: "i-heroicons-sun",
  },

  {
    value: "dark",
    icon: "i-heroicons-moon",
  },
];
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
