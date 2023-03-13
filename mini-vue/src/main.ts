import { ref } from '@vue/reactivity'
import { createRenderer } from './renderer/src'
import { options } from './renderer/src/dom'

// test

// 在创建 renderer 时传入配置项
const renderer = createRenderer(options)

const MyComponent = {
  name: 'MyComponent',
  setup() {
    // setup 函数可以返回一个函数，该函数将作为组件的渲染函数
    return () => {
      return { type: 'div', children: 'hello setup' }
    }
  },
}
const Comp = {
  props: {
    foo: String,
  },
  setup(props, setupContext) {
    const { slots, emit, attrs, expose } = setupContext
    console.log(setupContext)

    const count = ref(1000)
    // 返回一个对象，对象中的数据会暴露到渲染函数中
    return {
      count,
    }
  },
  render() {
    return {
      type: MyComponent,
      children: {
        header() {
          return { type: 'h1', children: 'header' }
        },
        body() {
          return { type: 'section', children: 'body' }
        },
        footer() {
          return { type: 'p', children: 'footer' }
        },
      },
    }
  },
}

const oldVNode = {
  type: Comp,
  props: {},
}

renderer.render(oldVNode, document.querySelector('#app'))

setTimeout(() => {
  // const newVNode = {
  //   type: MyComponent,
  //   props: {
  //     title: 'A small',
  //   },
  // }
  // renderer.render(newVNode, document.querySelector('#app'))
}, 1000)
