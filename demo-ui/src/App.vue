<script setup lang="ts">
// import Message from './components/message/src/message.vue';
import BananaMessage from './components/message'
// import { Apple } from '@element-plus/icons-vue'
import BaIcon from './components/icon'
import Chart from './banana-icons/vue/src/components/chart.vue'

function open() {
  const close = BananaMessage({
    message: 'hello v',
  })
  console.log(close)
}
</script>

<template>
  <button @click="open">open</button>

  <!-- <Apple /> -->

  <BaIcon :size="50" color="red">
    <Chart />
  </BaIcon>
</template>

<style scoped></style>
