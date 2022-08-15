<template>
  <div class="c-aside">
    <slot />
  </div>
</template>
<script lang="ts" setup>
interface Props {}

defineProps<Props>()
</script>
<style lang="scss" scoped>
@include b(c-aside) {
  overflow: auto;
  flex-shrink: 0;
}
</style>
