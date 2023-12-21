<script setup lang="ts">
import { ref } from 'vue'
const items = ref([1, 2, 3])

const add = () => {
  items.value.push(items.value.length + 1)
}
</script>

<template>
  <div>
    <button @click="add">add</button>
    <TransitionGroup name="list" tag="ul">
      <li v-for="item in items" :key="item">
        {{ item }}
      </li>
    </TransitionGroup>
  </div>
</template>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
