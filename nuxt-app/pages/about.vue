<template>
  <section>
    <p>This page will be displayed at the /about route.</p>
    <p>Page visits: {{ data.title }}</p>
  </section>
</template>

<script setup>
const { data } = await useLazyFetch(
  'https://jsonplaceholder.typicode.com/posts/1'
)

console.log(data.value)
</script>
