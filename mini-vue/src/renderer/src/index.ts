import { shouldSetAsProps } from './utils'

export function createRenderer(options) {
  // 通过 options 得到操作 DOM 的 API
  const { createElement, insert, setElementText, patchProps } = options

  function render(vnode, container) {
    if (vnode) {
      // 新 vnode 存在，将其与旧 vnode 一起传递给 patch 函数，进行打补丁
      patch(container._vnode, vnode, container)
    } else {
      if (container._vnode) {
        unmount(container._vnode)
      }
    }
    // 把 vnode 存储到 container._vnode 下，即后续渲染中的旧 vnode
    container._vnode = vnode
  }

  function unmount(vnode) {
    // 旧 vnode 存在，且新 vnode 不存在，说明是卸载（unmount）操作
    // 只需要将 container 内的 DOM 清空即可
    // 根据 vnode 获取要卸载的真实 DOM 元素
    // 获取 el 的父元素
    const parent = vnode.el.parentNode
    // 调用 removeChild 移除元素
    if (parent) parent.removeChild(vnode.el)
  }

  /**
   *
   * @param n1 旧 vnode
   * @param n2 新 vnode
   * @param container 容器、挂载点
   */
  function patch(n1, n2, container) {
    // 如果 n1 存在，则对比 n1 和 n2 的类型
    if (n1 && n1.type !== n2.type) {
      // 如果新旧 vnode 的类型不同，则直接将旧 vnode 卸载
      unmount(n1)
      n1 = null
    }
    // 代码运行到这里，证明 n1 和 n2 所描述的内容相同
    const { type } = n2
    // 如果 n2.type 的值是字符串类型，则它描述的是普通标签元素
    if (typeof type === 'string') {
      // 如果 n1 不存在，意味着挂载，则调用 mountElement 函数完成挂载
      if (!n1) {
        mountElement(n2, container)
      } else {
        // n1 存在，意味着打补丁，暂时省略
        patchElement(n1, n2)
      }
    } else if (typeof type === 'object') {
      // 如果 n2.type 的值的类型是对象，则它描述的是组件
    } else if (type === 'xxx') {
      // 处理其他类型的 vnode
    }
  }

  function mountElement(vnode, container) {
    // 创建 DOM 元素
    // 让 vnode.el 引用真实 DOM 元素
    const el = (vnode.el = createElement(vnode.type))
    // 处理子节点，如果子节点是字符串，代表元素具有文本节点
    if (typeof vnode.children === 'string') {
      // 因此只需要设置元素的 textContent 属性即可
      setElementText(el, vnode.children)
    } else if (Array.isArray(vnode.children)) {
      // 如果 children 是数组，则遍历每一个子节点，并调用 patch 函数挂载它
      vnode.children.forEach((child) => {
        patch(null, child, el)
      })
    }
    if (vnode.props) {
      for (const key in vnode.props) {
        patchProps(el, key, null, vnode.props[key])
      }
    }
    // 将元素添加到容器中
    insert(el, container)
  }

  return {
    render,
  }
}
