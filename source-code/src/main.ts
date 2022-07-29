import { effect, ref } from '@vue/reactivity'
import { createRenderer } from './runtime'
import { VNode } from './runtime/vnode'

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
  const newVnode = {
    type: 'div',
    children: [
      { type: 'p', children: '3', key: 3 },
      // { type: 'p', children: '1', key: 1 },
      // { type: 'p', children: '4', key: 4 },
      { type: 'p', children: '2', key: 2 },
    ],
  }
  renderer.render(newVnode, document.getElementById('app')!)
}, 1000)
