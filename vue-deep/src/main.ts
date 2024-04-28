import { ref, effect } from '@vue/reactivity'

type VNode = {
  type: string
  children: string
}

type Container = HTMLElement & { _vnode: VNode | null }

type Options = {
  createElement: (tag: string) => HTMLElement
  setElementText: (el: HTMLElement, text: string) => void
  insert: (el: HTMLElement, parent: HTMLElement, anchor: HTMLElement | null) => void
}

// !main
function createRenderer(options: Options) {
  const { createElement, setElementText, insert } = options

  function mountElement(vnode: VNode, container: Container) {
    const el = createElement(vnode.type)
    if (typeof vnode.children === 'string') {
      setElementText(el, vnode.children)
    }
    insert(el, container, null)
  }

  function patch(oldVNode: VNode | null, newVNode: VNode, container: Container) {
    if (!oldVNode) {
      // 挂载操作
      mountElement(newVNode, container)
    } else {
      // 更新操作 打补丁
    }
  }

  function render(newVNode: VNode | null, container: Container) {
    if (newVNode) {
      // 新节点存在 传入 新旧节点 进行 patch 打补丁
      // 或者挂载 挂载可以看作旧节点为空的打补丁
      patch(container._vnode, newVNode, container)
    } else {
      // 新节点不存在 且 旧节点存在 说明是卸载操作
      if (container._vnode) {
        container.innerHTML = ''
      }
    }

    container._vnode = newVNode
  }

  return {
    render,
  }
}

const vnode: VNode = {
  type: 'h1',
  children: 'Hello Vue',
}

const jsonOptions: Options = {
  createElement(tag) {
    console.log(`创建元素 ${tag}`)
    return { tag }
  },
  setElementText(el, text) {
    console.log(`设置元素 ${JSON.stringify(el)} 的文本为 ${text}`)
    el.text = text
  },
  insert(el, parent, anchor = null) {
    console.log(`插入元素 ${JSON.stringify(el)} 到 ${JSON.stringify(parent)}`)
    parent.children = el
  },
}

const renderer = createRenderer({
  createElement(tag: string) {
    return document.createElement(tag)
  },
  setElementText(el: HTMLElement, text: string) {
    el.textContent = text
  },
  insert(el: HTMLElement, parent: HTMLElement, anchor: HTMLElement | null) {
    parent.insertBefore(el, anchor)
  },
  ...jsonOptions,
})

const jsonContainer = { type: 'root' }

renderer.render(vnode, jsonContainer)

console.log('jsonContainer', jsonContainer)
