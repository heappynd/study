import type { VNode } from './vnode'

export type RendererOptions = {
  createElement: (type: string) => any
  insert: (el: any, parent: any, anchor?: any) => void
  setElementText: (el: any, text: string) => void
}

export function createRenderer(options: RendererOptions) {
  const { createElement, insert, setElementText } = options

  /**
   * 渲染器核心入口
   * @param n1 旧vnode
   * @param n2 新vnode
   * @param container 容器
   */
  function patch(n1: VNode | null, n2: VNode, container: any) {
    // 如果n1不存在 意味着挂载 则调用mountElement函数完成挂载
    if (!n1) {
      mountElement(n2, container)
    } else {
      // n1存在 意味着打补丁
    }
  }

  function mountElement(vnode: VNode, container: any) {
    const el = createElement(vnode.type)
    if (typeof vnode.children === 'string') {
      setElementText(el, vnode.children)
    }
    insert(el, container)
  }

  function render(vnode: any, container: any) {
    if (vnode) {
      patch(container._vnode, vnode, container)
    } else {
      if (container._vnode) {
        container.innerHTML = ''
      }
    }
    container._vnode = vnode
  }

  return {
    render,
  }
}
