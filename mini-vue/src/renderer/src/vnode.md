# The following example

## Example 1

```ts
const vnode1 = {
  type: 'h1',
  // 使用 props 描述一个元素的属性
  props: {
    id: 'foo',
  },
  children: [
    {
      type: 'p',
      children: 'hello',
      props: {
        class: normalizeClass('foo bar'),
      },
    },
    {
      type: 'button',
      props: {
        disabled: '',
        class: normalizeClass({ foo: true, bar: false }),
      },
      children: 'click me',
    },
    {
      type: 'div',
      props: {
        class: normalizeClass(['foo bar', { baz: true }]),
      },
      children: 'div',
    },
  ],
}
```

## Example 2

```ts
const vnode1 = {
  type: 'p',
  children: 'text',
  props: {
    onClick: [
      () => {
        alert('clicked')
      },
      () => {
        alert('clicked again')
      },
    ],
    onContextmenu: () => {
      alert('contextmenu')
    },
  },
}
```

## Example 3

```ts
const vnode1 = {
  type: 'div',
  props: bol.value
    ? {
        onClick: () => {
          console.log('父元素 clicked')
        },
      }
    : {},
  children: [
    {
      type: 'p',
      props: {
        onClick: () => {
          bol.value = true
        },
      },
      children: 'text',
    },
  ],
}
```

# Example 4

```ts
const MyComponent = {
  name: 'MyComponent',
  props: {
    title: String,
  },
  data() {
    return {
      foo: 'hello world',
    }
  },
  mounted() {
    setTimeout(() => {
      console.log(this)
    }, 1000)
  },
  render() {
    return {
      type: 'div',
      children: `foo 的值是: ${this.title}`,
    }
  },
}

const oldVNode = {
  type: MyComponent,
  props: {
    title: 'A small component',
  },
}
```

# Example 5

```ts
const MyComponent = {
  name: 'MyComponent',
  setup() {
    // setup 函数可以返回一个函数，该函数将作为组件的渲染函数
    return () => {
      return { type: 'div', children: 'hello setup' }
    }
  },
}
```

# Example 6 emit

```ts
const Comp = {
  props: {
    foo: String,
  },
  setup(props, setupContext) {
    const { slots, emit, attrs, expose } = setupContext
    emit('change', 'sss')
    const count = ref(1000)
    // 返回一个对象，对象中的数据会暴露到渲染函数中
    return {
      count,
    }
  },
  render() {
    return { type: 'div', children: `count is: ${this.count.value}` }
  },
}

const oldVNode = {
  type: Comp,
  props: {
    foo: 'A small component',
    onChange: () => {
      console.log('onChange')
    },
  },
}
```

# Example 7 onMounted

```ts
const Comp = {
  props: {
    foo: String,
  },
  setup(props, setupContext) {
    const { slots, emit, attrs, expose } = setupContext

    onMounted(() => {
      console.log('on', setupContext)
    })

    const count = ref(1000)
    // 返回一个对象，对象中的数据会暴露到渲染函数中
    return {
      count,
    }
  },
  render() {
    return {
      type: 'div',
      children: 'xsda',
    }
  },
}
```

# Example 8 functional components

```javascript
function MyFuncComp(props) {
  return { type: 'h1', children: props.title }
}
MyFuncComp.props = {
  title: String,
}

const oldVNode = {
  type: MyFuncComp,
  props: {},
}
```
