<template>
  <section class="pg">
    <p>This page will be displayed at the /about route.</p>
  </section>
  <img src="/img/2880331459.webp" alt="public" style="width: 300px" />

  <br />

  <img src="~/assets/img/2884182275.webp" alt="assets" />

  <h2>Page visits: {{ count }}</h2>

  <ButtonA />
  <ButtonB />
  {{ counter }}
</template>

<script setup>
useHead({
  title: 'About',
})

const { data: count } = await useFetch('/api/count')

const counter = useCounter()
</script>

<style lang="scss" scoped>
.pg {
  color: $primary;
}
</style>
