<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <RouterLink :to="{ path: '/' }" />
  <RouterView />
</template>

<style scoped></style>
