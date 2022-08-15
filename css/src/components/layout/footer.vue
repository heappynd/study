<template>
  <footer class="c-footer" :class="{ 'c-layout--fixed': fixed }">
    <slot />
  </footer>
</template>
<script lang="ts" setup>
interface Props {
  fixed?: boolean
}

defineProps<Props>()
</script>
<style lang="scss" scoped>
@include b(c-footer) {
  @include m(fixed) {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 10;
  }
}
</style>
