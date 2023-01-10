<template>
  <button @click="counter++">+</button>
</template>

<script lang="ts" setup>
const counter = useCounter()
</script>
