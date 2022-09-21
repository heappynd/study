<script setup>
definePageMeta({
  middleware: 'auth',
})
const config = useAppConfig()
// const
</script>

<template>
  <h1>Welcome to your dashboard</h1>
  {{ config.description }}
</template>
