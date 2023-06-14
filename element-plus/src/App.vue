<script setup lang="ts">
const count = ref(0);
const doubled = computed(() => count.value * 2);

const increment = () => count.value++;
</script>

<template>
  <ElButton @click="increment">Button {{ doubled }}</ElButton>
  <el-alert title="success alert" type="success" />
</template>

<style scoped></style>
