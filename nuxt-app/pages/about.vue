<template>
  <div>
    Counter: {{ counter }}
    <button @click="counter++">+</button>
    <button @click="counter--">-</button>
  </div>
</template>

<script setup>
const counter = useState('counter', () => Math.round(Math.random() * 1000))

throw createError({ name: 'ss', message: 'ssfsd' })
</script>
