import { createRenderer } from './compiler'
import { VNode } from './compiler/vnode'

const vnode: VNode = {
  type: 'h1',
  children: 'hello',
}

const renderer = createRenderer({
  createElement(tag) {
    return document.createElement(tag)
  },
  setElementText(el: HTMLElement, text) {
    el.textContent = text
  },
  insert(el: HTMLElement, parent: HTMLElement, anchor = null) {
    parent.insertBefore(el, anchor)
  },
})
renderer.render(vnode, document.querySelector('#app'))
