<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Site Title` : 'Site Title'
  },
  bodyAttrs: {
    class: 'test',
  },
  script: [{ src: 'https://third-party-script.com', body: true }],
})
</script>
