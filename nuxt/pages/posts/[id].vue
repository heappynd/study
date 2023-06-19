<template>
  <div>Posts {{ route.params.id }}</div>
</template>

<script lang="ts" setup>
definePageMeta({
  validate: async (route) => {
    console.log("验证中");
    const nuxtApp = useNuxtApp();
    // Check if the id is made up of digits
    return /^\d+$/.test(route.params.id);
  },
});
const route = useRoute();
</script>
