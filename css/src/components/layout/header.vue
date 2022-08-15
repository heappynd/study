<template>
  <header class="c-header" :class="{ 'c-layout--fixed': fixed }">
    <slot />
  </header>
</template>
<script lang="ts" setup>
interface Props {
  fixed?: boolean
}

defineProps<Props>()
</script>
<style lang="scss" scoped>
@include b(c-header) {
  @include m(fixed) {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10;
  }
}
</style>
