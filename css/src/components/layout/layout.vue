<template>
  <section class="c-layout" :class="{ 'c-layout--horizontal': horizontal }">
    <slot />
  </section>
</template>
<script lang="ts" setup>
interface Props {
  horizontal?: boolean
}

defineProps<Props>()
</script>
<style lang="scss" scoped>
@include b(c-layout) {
  display: flex;
  flex-direction: column;

  @include m(horizontal) {
    flex-direction: row;
  }
}
</style>
