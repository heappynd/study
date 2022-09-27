<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'
import { computed, toRefs } from 'vue'

const counterStore = useCounterStore()

// const doubleValue = computed(() => counterStore.doubleCount)
const { count, doubleCount } = storeToRefs(counterStore)
const { increment } = counterStore

function reset() {
  counterStore.$reset()
}
function plus() {
  doubleCount.value++
  // count.value++
  // increment()
}
function minus() {
  counterStore.$patch({
    count: count.value - 1,
  })
}

counterStore.$subscribe((mutation, state) => {
  console.log(mutation)
  console.log(state)
})
</script>

<template>
  <h2>{{ doubleCount }}</h2>

  <button @click="plus">+</button>
  <button @click="minus">-</button>

  <button @click="reset">reset</button>
</template>
