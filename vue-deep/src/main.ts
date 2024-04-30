import { ref, effect } from '@vue/reactivity'
import './style.css'
import { normalizeClass } from './shared/normalizeProp'

type Invoker = {
  (e: Event): void
  value: (e: Event) => void
}

type VNodeEl = HTMLElement & { _vei?: { [key: string]: Invoker } }

type VNode = {
  type: string
  children: string | VNode[]
  props?: { [key: string]: unknown }
  el: VNodeEl | null
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
    // 让 vnode.el 引用真实 DOM 元素
    vnode.el = el
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
    if (oldVNode && oldVNode.type !== newVNode.type) {
      console.log('新旧节点描述的内容不同，直接卸载旧节点')
      unmount(oldVNode)
      oldVNode = null
    }
    // 代码运行到这里，证明 n1 和 n2 所描述的内容相同
    const { type } = newVNode
    // 如果 n2.type 的值是字符串类型，则它描述的是普通标签元素
    if (typeof type === 'string') {
      console.log('新节点描述的是普通标签元素')

      if (!oldVNode) {
        mountElement(newVNode, container)
      } else {
        // 更新
        // patchElement(oldVNode, newVNode)
      }
    } else if (typeof type === 'object') {
      // 说明是组件
    } else if (type === 'xxx') {
      // 其他类型
    }
  }

  function unmount(vnode: VNode) {
    const parent = vnode.el?.parentNode
    if (parent) {
      parent.removeChild(vnode.el)
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
        // 卸载操作
        unmount(container._vnode)
      }
    }

    container._vnode = newVNode
  }

  return {
    render,
  }
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
  patchProps(el: VNodeEl, key, prevValue, nextValue) {
    if (/^on/.test(key)) {
      // 处理事件
      const invokers = el._vei || (el._vei = {})
      let invoker = invokers[key]
      const name = key.slice(2).toLowerCase()
      if (nextValue) {
        // 存在处理函数
        if (!invoker) {
          invoker = el._vei[key] = (e) => {
            if (Array.isArray(invoker.value)) {
              invoker.value.forEach((fn) => fn(e))
            } else {
              invoker.value(e)
            }
          }
          invoker.value = nextValue
          el.addEventListener(name, invoker)
        } else {
          // 如果存在则更新
          invoker.value = nextValue
        }
      } else if (invoker) {
        // 如果新的事件绑定函数不存在，但是之前的invoker存在，则移除绑定
        el.removeEventListener(name, invoker)
      }
    } else if (key === 'class') {
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

// test

const vnode: VNode = {
  type: 'p',
  props: {
    onClick: [
      () => {
        console.log('click1')
      },
      () => {
        console.log('click2')
      },
    ],
    onContextmenu: () => {
      console.log('contextmenu')
    },
  },
  children: 'Hello Vue',
  // children: [],
}

renderer.render(vnode, document.querySelector('#app')!)
setTimeout(() => {
  const vnode: VNode = {
    type: 'p',
    props: {
      onClick: () => {
        console.log('click')
      },
    },
    children: 'Hello React',
    // children: [],
  }
  renderer.render(vnode, document.querySelector('#app')!)
}, 2000)
