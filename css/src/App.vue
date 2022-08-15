<script setup lang="ts">
import { onMounted } from 'vue'
import CompMedia from './components/CompMedia.vue'
import Layout from './Layout.vue'
import Theme from './Theme.vue'

onMounted(() => {
  document.documentElement.setAttribute('data-theme', 'light')
})
</script>

<template>
  <div>
    <!-- <p class="part">part</p>

    <h1>h1</h1>

    <a href="">百度</a>

    <header>Title</header>

    <CompMedia />

    <c-row>
      <c-col span="8">1</c-col>
      <c-col span="8">2</c-col>
      <c-col span="8">3</c-col>
    </c-row> -->

    <!-- <Layout /> -->
    <!-- <h1 font-quaternary>Title</h1> -->

    <Theme />
  </div>
</template>

<style lang="scss" scoped></style>
