// import { effect, ref } from '@vue/reactivity'
import type { VNode } from './runtime-dom'
import { createRenderer } from './runtime-dom'
import { normalizeClass } from '@vue/shared'
import { effect, ref } from '@vue/reactivity'

const renderer = createRenderer()

const vnode: VNode = {
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
renderer.render(vnode, document.querySelector('#app')!)

setTimeout(() => {
  const vnode: VNode = {
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
  renderer.render(vnode, document.querySelector('#app')!)
}, 1000)
