import { createRenderer } from './renderer/src'
import { options } from './renderer/src/dom'

// test

// 在创建 renderer 时传入配置项
const renderer = createRenderer(options)

const oldVNode = {
  type: 'div',
  children: [
    { type: 'p', children: '1', key: 1 },
    { type: 'p', children: '2', key: 2 },
    { type: 'h2', children: 'hello', key: 3 },
  ],
}

renderer.render(oldVNode, document.querySelector('#app'))

setTimeout(() => {
  // debugger
  const newVNode = {
    type: 'div',
    children: [
      { type: 'h2', children: 'world', key: 3 },
      // { type: 'p', children: '1', key: 1 },
      { type: 'p', children: '2', key: 2 },
      { type: 'p', children: '4', key: 4 },
    ],
  }
  renderer.render(newVNode, document.querySelector('#app'))
}, 1000)
