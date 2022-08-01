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
  ],
}
renderer.render(vnode, document.querySelector('#app')!)

setTimeout(() => {
  const vnode: VNode = {
    type: 'div',
    children: [
      { type: 'p', children: '3', key: 3 },
      { type: 'p', children: '1', key: 1 },
    ],
  }
  renderer.render(vnode, document.querySelector('#app')!)
}, 1000)
