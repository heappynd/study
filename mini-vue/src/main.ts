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
    { type: 'p', children: '3', key: 3 },
    { type: 'p', children: '4', key: 4 },
    { type: 'p', children: '6', key: 6 },
    { type: 'p', children: '5', key: 5 },
  ],
}

renderer.render(oldVNode, document.querySelector('#app'))

setTimeout(() => {
  // debugger
  const newVNode = {
    type: 'div',
    children: [
      { type: 'p', children: '1', key: 1 },
      { type: 'p', children: '3', key: 3 },
      { type: 'p', children: '4', key: 4 },
      { type: 'p', children: '2', key: 2 },
      { type: 'p', children: '7', key: 7 },
      { type: 'p', children: '5', key: 5 },
    ],
  }
  renderer.render(newVNode, document.querySelector('#app'))
}, 1000)
