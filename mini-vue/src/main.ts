import { createRenderer } from './renderer/src'

// test

const vnode1 = {
  type: 'h1',
  children: 'hello',
}
// 在创建 renderer 时传入配置项
const renderer = createRenderer({
  // 用于创建元素
  createElement(tag) {
    return document.createElement(tag)
  },
  // 用于设置元素的文本节点
  setElementText(el, text) {
    el.textContent = text
  },
  // 用于在给定的 parent 下添加指定元素
  insert(el, parent, anchor = null) {
    parent.insertBefore(el, anchor)
  },
})

renderer.render(vnode1, document.querySelector('#app'))
// renderer.render(vnode2, document.querySelector('#app'))
// renderer.render(null, document.querySelector('#app'))
