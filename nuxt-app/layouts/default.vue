<template>
  <div>
    <AppHeader />
    <header>
      <nav>
        <ul>
          <li><NuxtLink to="/about">About</NuxtLink></li>
          <li><NuxtLink to="/posts/1">Post 1</NuxtLink></li>
          <li><NuxtLink to="/posts/2">Post 2</NuxtLink></li>
          <li>
            <NuxtLink to="/dashboard">dashboard</NuxtLink>
          </li>
        </ul>
      </nav>
    </header>
    <slot />
    <AppFooter />
  </div>
</template>

<script setup>
const route = useRoute()

console.log(route.meta)
</script>
