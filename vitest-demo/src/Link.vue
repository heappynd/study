<template>
  <h2 :style="{ color: color }">Link</h2>
</template>

<script setup>
const props = defineProps({
  color: {
    type: String,
    default: "red",
  },
});
</script>
