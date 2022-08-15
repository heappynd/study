<template>
  <div>
    <button @click="toggle">toggle</button>
    <div class="box">box</div>
    <div class="text">text</div>

    <div class="box2">box2</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const isDark = ref(true)

function toggle() {
  isDark.value = !isDark.value

  document.documentElement.setAttribute(
    'data-theme',
    isDark.value ? 'light' : 'dark'
  )
}
</script>

<style lang="scss" scoped>
.box {
  width: 100px;
  height: 100px;
}
</style>
