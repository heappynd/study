import { VNode } from './vnode'

type RendererElement = HTMLElement & {
  _vnode?: VNode
  /** vue event invoker */
  _vei?: {
    value: () => void
    [key: string]: (e: any) => void
  }
}

export function createRenderer() {
  function patch(n1: VNode | undefined | null, n2: VNode, container: RendererElement) {
    // 1 如果n1存在 则对比n1和n2的类型
    if (n1 && n1.type !== n2.type) {
      // 如果不相同 卸载旧的
      unmount(n1)
      n1 = null
    }
    // 代码运行到这里 说明n1和n2所描述的内容相同
    const { type } = n2
    // n2 的type为string 则描述的是普通标签
    if (typeof type === 'string') {
      // n1旧节点不存在 意味着挂载
      if (!n1) {
        mountElement(n2, container)
      } else {
        // n1 n2 都存在 复杂
        patchElement(n1, n2)
      }
    } else if (typeof type === 'object') {
      // todo 是对象描述的是组件
    } else if (type === 'xxx') {
      // todo 处理其他type
    }
  }

  function patchElement(n1: VNode, n2: VNode) {}

  function shouldSetAsProps(el: RendererElement, key: string, value: any) {
    // 特殊处理
    if (key === 'form' && el.tagName === 'INPUT') {
      return false
    }
    // 兜底
    return key in el
  }

  function mountElement(vnode: VNode, container: RendererElement) {
    // 让vnode.el引用真实DOM元素
    const el = (vnode.el = document.createElement(vnode.type) as RendererElement)
    if (typeof vnode.children === 'string') {
      el.textContent = vnode.children
    } else if (Array.isArray(vnode.children)) {
      vnode.children.forEach((child) => {
        patch(null, child, el)
      })
    }

    if (vnode.props) {
      for (const key in vnode.props) {
        const value = vnode.props[key]
        if (/^on/.test(key)) {
          // 获取为该元素伪造的事件处理函数 invoker
          const invokers = el._vei || (el._vei = {})
          let invoker = invokers[key]
          // 匹配事件
          const name = key.slice(2).toLowerCase()
          if (value) {
            if (!invoker) {
              // 如果没有invoker 将一个伪造的invoker缓存到el._vei中
              invoker = el._vei[key] = (e) => {
                // 当伪造的事件处理函数执行时 会执行真正的事件处理函数
                if (Array.isArray(invoker.value)) {
                  invoker.value.forEach((fn) => fn(e))
                } else {
                  invoker.value(e)
                }
              }
              invoker.value = value
              // 绑定invoker 作为事件处理函数
              el.addEventListener(name, invoker)
            } else {
              invoker.value = value
            }
          } else if (invoker) {
            // 新的事件绑定函数不存在 且之前绑定的invoker存在 则移除绑定
            el.removeEventListener(name, invoker)
          }
        } else if (key === 'class') {
          // todo normalizeClass 源码在 @vue/shared
          el.className = value || ''
        } else if (shouldSetAsProps(el, key, value)) {
          const type = typeof el[key]
          if (typeof type === 'boolean' && value === '') {
            el[key] = true
          } else {
            el[key] = value
          }
        } else {
          el.setAttribute(key, value)
        }
      }
    }

    container.appendChild(el)
  }

  function unmount(vnode: VNode) {
    const parent = vnode.el.parentNode
    if (parent) {
      parent.removeChild(vnode.el)
    }
  }

  function render(vnode: VNode, container: RendererElement) {
    if (vnode) {
      // 新vnode存在 打补丁
      patch(container._vnode, vnode, container)
    } else {
      if (container._vnode) {
        // 旧vnode存在 新vnode不存在 unmount
        unmount(container._vnode)
      }
    }
    container._vnode = vnode
  }

  return {
    render,
  }
}
