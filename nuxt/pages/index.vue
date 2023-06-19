<template>
  <div>
    <h1 class="title">Welcome to the homepage</h1>
    <AppAlert> This is an auto-imported component </AppAlert>
    <img src="~/assets/copyright.png" alt="" />
    <NuxtLink to="/about">About page</NuxtLink>
    <div>
      Counter: {{ counter }}
      <button @click="counter++">+</button>
      <button @click="counter--">-</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const counter = useState("counter", () => Math.round(Math.random() * 1000));
</script>

<style lang="scss" scoped>
.title {
  color: $primary;
}
</style>
