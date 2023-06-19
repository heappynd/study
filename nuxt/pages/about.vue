<template>
  <section>
    <p>This page will be displayed at the /about route.</p>
    <!-- <p>Data: {{ data }}</p> -->
    <!-- <button @click="refresh()">refresh</button> -->
    <p>count: {{ count ? count : 'Loading' }}</p>
    <NuxtLink to="/">Home page</NuxtLink>
    <p>{{ counter }}</p>
  </section>
</template>

<script lang="ts" setup>
// const { data, refresh } = await useFetch("/api/hello");
const { data: count } = useLazyFetch("/api/count");
const counter = useState("counter", () => Math.round(Math.random() * 1000));
</script>
