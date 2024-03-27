<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/WebSocket">WebSocket</RouterLink>
    <RouterLink to="/Terminal">Terminal</RouterLink>
  </nav>

  <RouterView />
</template>

<style scoped></style>
