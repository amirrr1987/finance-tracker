<template>
  <!-- <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
 -->
  <div>
    {{ amir.transaction }}
    <UNotifications />
  </div>
</template>
<script setup lang="ts">
const amir = useAmirStore();
amir.transaction = {
  amount: "sdf",
  createdAt: `${new Date()}`,
};

await amir.createOne.fetch();
</script>
