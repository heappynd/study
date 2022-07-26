import { VNode } from './vnode'

type RendererElement = HTMLElement & {
  _vnode?: VNode
}

export function createRenderer() {
  function patch(n1: VNode | undefined | null, n2: VNode, container: RendererElement) {
    // n1旧节点不存在 意味着挂载
    if (!n1) {
      mountElement(n2, container)
    } else {
      // n1 n2 都存在 复杂
    }
  }

  function shouldSetAsProps(el: RendererElement, key: string, value: any) {
    // 特殊处理
    if (key === 'form' && el.tagName === 'INPUT') {
      return false
    }
    // 兜底
    return key in el
  }

  function mountElement(vnode: VNode, container: RendererElement) {
    const el = document.createElement(vnode.type)
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
        if (shouldSetAsProps(el, key, value)) {
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

  function render(vnode: VNode, container: RendererElement) {
    if (vnode) {
      // 新vnode存在 打补丁
      patch(container._vnode, vnode, container)
    } else {
      if (container._vnode) {
        // 旧vnode存在 新vnode不存在 unmount
        container.innerHTML = ''
      }
    }
    container._vnode = vnode
  }

  return {
    render,
  }
}
