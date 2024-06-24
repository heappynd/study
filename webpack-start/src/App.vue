<template>
  <div class="title">
    App

    <RouterLink to="/">Home</RouterLink>
    |
    <RouterLink to="/about">About</RouterLink>

    <ElButton type="danger">Button</ElButton>

    <RouterView />
  </div>
</template>

<script setup>
import { RouterView, RouterLink } from 'vue-router'

console.log(1)
</script>

<style>
.title {
  color: aqua;
  font-size: 50px;
}
</style>
