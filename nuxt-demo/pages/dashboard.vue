<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
})

useHead({
  title: 'Dashboard',
})
</script>

<template>
  <h1>Welcome to your dashboard</h1>
</template>
