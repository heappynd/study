<template>
  <div id="app">
    <gpu-monitor />
  </div>
</template>

<script>
import GpuMonitor from './components/GpuMonitor.vue'
export default {
  name: 'App',
  components: { GpuMonitor },
}
</script>

<style lang="less">
body {
  padding: 30px;
}
</style>
