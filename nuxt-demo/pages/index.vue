<script setup>
const runtimeConfig = useRuntimeConfig()

console.log('runtimeConfig', runtimeConfig)

const appConfig = useAppConfig()

console.log('appConfig', appConfig)
</script>

<template>
  <AppAlert> This is an auto-imported component. </AppAlert>
</template>
