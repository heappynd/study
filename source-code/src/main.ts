import { createRenderer, RendererOptions } from './compiler'
import { VNode } from './compiler/vnode'

const vnode: VNode = {
  type: 'div',
  props: {
    id: 'foo',
  },
  children: [
    {
      type: 'p',
      children: 'hello',
    },
  ],
}

const dom: RendererOptions = {
  createElement(tag) {
    return document.createElement(tag)
  },
  setElementText(el: HTMLElement, text) {
    el.textContent = text
  },
  insert(el: HTMLElement, parent: HTMLElement, anchor = null) {
    parent.insertBefore(el, anchor)
  },
}

const custom: RendererOptions = {
  createElement(tag) {
    console.log(`创建元素${tag}`)
    return { tag }
  },
  setElementText(el, text) {
    console.log(`设置${JSON.stringify(el)}的文本内容: ${text}`)
    el.textContent = text
  },
  insert(el, parent, anchor = null) {
    console.log(`将${JSON.stringify(el)}添加到: ${JSON.stringify(parent)}下`)
    parent.children = el
  },
}

const renderer = createRenderer(dom)
renderer.render(vnode, document.querySelector('#app'))
// renderer.render(vnode, { type: 'root' })
