```vue
<template>
  <header><slot name="header" /></header>
</template>
```

```js
function render() {
  return [
    {
      type: 'header',
      children: [this.$slots.header()],
    },
  ]
}
```

```vue
<template>
  <MyComponent>
    <template #header>
      <h1>我是标题</h1>
    </template>
  </MyComponent>
</template>
```

```js
function render() {
  return {
    type: MyComponent,
    children: {
      header() {
        return { type: 'h1', children: '我是标题' }
      },
    },
  }
}
```
