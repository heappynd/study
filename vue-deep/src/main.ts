import { ref, effect } from '@vue/reactivity'
import './style.css'
import { normalizeClass } from './shared/normalizeProp'

type VNode = {
  type: string
  children: string | VNode[]
  props?: { [key: string]: unknown }
}

type Container = HTMLElement & { _vnode: VNode | null }

type Options = {
  createElement: (tag: string) => HTMLElement
  setElementText: (el: HTMLElement, text: string) => void
  insert: (el: HTMLElement, parent: HTMLElement, anchor: HTMLElement | null) => void
}

function shouldSetAsProps(el: HTMLElement, key, value) {
  // because input 标签的 form 属性是只读的，所以不能直接设置
  if (key === 'form' && el.tagName === 'INPUT') {
    return false
  }
  return key in el
}

// !main
function createRenderer(options: Options) {
  const { createElement, setElementText, insert, patchProps } = options

  function mountElement(vnode: VNode, container: Container) {
    const el = createElement(vnode.type)
    if (typeof vnode.children === 'string') {
      setElementText(el, vnode.children)
    } else if (Array.isArray(vnode.children)) {
      vnode.children.forEach((child) => {
        patch(null, child, el)
      })
    }
    if (vnode.props) {
      for (const key in vnode.props) {
        const value = vnode.props[key]
        patchProps(el, key, null, value)
      }
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
  props: {
    // class: 'foo bar',
    // class: {
    //   foo: true,
    //   bar: false,
    // },
    class: ['foo bar', { baz: true }],
  },
  children: 'Hello Vue',
  // children: [],
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
  // 将属性设置相关操作封装到 patchProps 函数中，并作为渲染器选项传递
  patchProps(el: HTMLElement, key, prevValue, nextValue) {
    if (key === 'class') {
      el.className = normalizeClass(nextValue || '')
    }
    // 判断是否在dom props上存在
    else if (shouldSetAsProps(el, key, nextValue)) {
      const type = typeof el[key]

      if (type === 'boolean' && nextValue === '') {
        el[key] = true
      } else {
        el[key] = nextValue
      }
    } else {
      console.log('setAttribute', key)

      el.setAttribute(key, nextValue)
    }
  },
})

renderer.render(vnode, document.querySelector('#app')!)
