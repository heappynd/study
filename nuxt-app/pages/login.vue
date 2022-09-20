<template>
  <div>
    <Head>
      <Title>{{ title }}</Title>
      <Meta name="description" :content="title" />
      <Style type="text/css" children="body { background-color: green; }" />
    </Head>
    <h1>请登录</h1>
  </div>
</template>

<script setup>
useHead({
  title: 'Login',
})
const title = ref('Hello World')
</script>
