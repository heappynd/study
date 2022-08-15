<script setup lang="ts">
import CompMedia from './components/CompMedia.vue'
import Layout from './Layout.vue'
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

    <Layout />
  </div>
</template>

<style lang="scss" scoped>
.part {
  color: $color-primary;
}

header {
  width: 200px;
  height: 200px;
  background: rgba($color: #000000, $alpha: 0.45);
  color: #fff;

  @include box-center(center, center);
}
</style>
