<template>
  <main class="c-main">
    <slot />
  </main>
</template>
<script lang="ts" setup>
interface Props {}

defineProps<Props>()
</script>
<style lang="scss" scoped>
@include b(c-main) {
  overflow: auto;
  flex: 1;
}
</style>
