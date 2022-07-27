import { createRenderer } from './runtime'
import { VNode } from './runtime/vnode'

const vnode: VNode = {
  type: 'h1',
  children: 'hello vue',
}
const newVnode: VNode = {
  type: 'h2',
  children: 'hello vue3',
}

const renderer = createRenderer()
renderer.render(vnode, document.querySelector('#app')!)

setTimeout(() => {
  renderer.render(newVnode, document.getElementById('app')!)
}, 1000)
