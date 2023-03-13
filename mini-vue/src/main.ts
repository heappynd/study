import { createRenderer } from './renderer/src'
import { options } from './renderer/src/dom'

// test

// 在创建 renderer 时传入配置项
const renderer = createRenderer(options)

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
      console.log(this);
      
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

renderer.render(oldVNode, document.querySelector('#app'))

setTimeout(() => {
  const newVNode = {
    type: MyComponent,
    props: {
      title: 'A small',
    },
  }
  renderer.render(newVNode, document.querySelector('#app'))
}, 1000)
