<template>
  <div>posts {{ route.params.id }}</div>
</template>

<script lang="ts" setup>
definePageMeta({
  validate: (route) => {
    return /^\d+$/.test(route.params.id)
  },
})

const route = useRoute()

console.log('route', route)
</script>
