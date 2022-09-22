<script setup>
definePageMeta({
  middleware: 'auth',
})
const config = useAppConfig()
// const

const res = await $fetch('/api/test', { method: 'get' })

console.log(res)
</script>

<template>
  <h1>Welcome to your dashboard</h1>
  {{ config.description }}
</template>
