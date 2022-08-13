<template>
  <i class="ba-icon" :style="style" v-bind="$attrs">
    <slot />
  </i>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaIcon',
  inheritAttrs: false,
})
</script>

<script lang="ts" setup>
import { computed } from 'vue'
import type { CSSProperties } from 'vue'

interface Props {
  size?: number
  color?: string
}
const props = defineProps<Props>()

const style = computed<CSSProperties>(() => {
  if (!props.size && !props.color) {
    return {}
  }
  return {
    fontSize: props.size === undefined ? undefined : `${props.size}px`,
    '--color': props.color,
  }
})
</script>

<style scoped>
.ba-icon {
  --color: inherit;
  height: 1em;
  width: 1em;
  line-height: 1em;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  fill: currentColor;
  color: var(--color);
  font-size: inherit;
}
</style>
