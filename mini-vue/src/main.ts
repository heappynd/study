import { createRenderer } from './renderer/src'
import { options } from './renderer/src/dom'

// test

// 在创建 renderer 时传入配置项
const renderer = createRenderer(options)

const oldVNode = {
  type: 'div',
  children: [
    { type: 'p', children: '1' },
    { type: 'p', children: '2' },
    { type: 'p', children: '3' },
  ],
}


renderer.render(oldVNode, document.querySelector('#app'))

setTimeout(() => {
  debugger
  const newVNode = {
    type: 'div',
    children: [
      { type: 'p', children: '4' },
      { type: 'p', children: '5' },
      { type: 'p', children: '6' },
    ],
  }
  renderer.render(newVNode, document.querySelector('#app'))
}, 1000)
