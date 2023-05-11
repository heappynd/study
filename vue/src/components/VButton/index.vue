<script setup lang="ts" generic="T">
import { toRef, toValue } from 'vue'
import type { ButtonProps } from './props'

// exp { extraProps = "sxx" }
const props = defineProps<ButtonProps<T> & { extraProps?: string }>()
// console.log(extraProps);

// const emit = defineEmits<{
//   (e: "foo", id: number): void;
//   (e: "bar", name: string, ...rest: any[]): void;
// }>();
// emit("bar", "1");

const emit = defineEmits<{
  foo: [id: number]
}>()
emit('foo', 1)

defineSlots<{
  default?: (props: { msg: string }) => any
  item?: (props: { id: number }) => any
}>()

const modelValue = defineModel()

defineOptions({
  name: 'VButtonX',
})

const sizeRef = toRef(() => props.size)

const normalSize = toValue(sizeRef)
console.log('normalSize', normalSize)
</script>

<template>
  <p>{{ modelValue }}</p>
  <button>
    <slot msg="123" />
    <slot name="item" :id="1" />
  </button>
  <input v-model="modelValue" />
</template>

<style scoped></style>
