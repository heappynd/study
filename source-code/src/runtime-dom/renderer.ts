import { options } from './custom'
import { VNode, Container } from './vnode'

export function createRenderer() {
  const { createElement, setElementText, insert, patchProps, unmount } = options

  function render(vnode: VNode, container: Container) {
    if (vnode) {
      patch(container._vnode, vnode, container)
    } else {
      if (container._vnode) {
        // unmount
        unmount(container._vnode)
      }
    }
    container._vnode = vnode
  }

  /**
   * 打补丁
   * @param n1 旧vnode
   * @param n2 新vnode
   * @param container 容器
   */
  function patch(n1: VNode | undefined | null, n2: VNode, container: Container) {
    if (n1 && n1.type !== n2.type) {
      // 描述不同
      unmount(n1)
      n1 = null
    }

    const type = n2.type
    if (typeof type === 'string') {
      if (!n1) {
        // mountElement
        mountElement(n2, container)
      } else {
        // 新旧 都存在 vnode
        patchElement(n1, n2)
      }
    } else if (type === 'xxx') {
      // TODO
    }
  }

  function mountElement(vnode: VNode, container: Container) {
    const el = createElement(vnode.type)
    vnode.el = el
    // children
    if (typeof vnode.children === 'string') {
      setElementText(el, vnode.children)
    } else if (Array.isArray(vnode.children)) {
      vnode.children.forEach((child) => {
        patch(null, child, el)
      })
    }

    // props
    if (vnode.props) {
      for (const key in vnode.props) {
        patchProps(el, key, null, vnode.props[key])
      }
    }

    insert(el, container)
  }

  function patchElement(n1: VNode, n2: VNode) {
    const el = (n2.el = n1.el)
    const oldProps = n1.props
    const newProps = n2.props
    for (const key in newProps) {
      if (newProps[key] != oldProps[key]) {
        patchProps(el, key, oldProps[key], newProps[key])
      }
    }
    for (const key in oldProps) {
      if (!(key in newProps)) {
        patchProps(el, key, oldProps[key], null)
      }
    }
    patchChildren(n1, n2, el)
  }

  function patchChildren(n1: VNode, n2: VNode, el: Container) {
    if (typeof n2.children === 'string') {
      if (Array.isArray(n1.children)) {
        n1.children.forEach((child) => unmount(child))
      }
      setElementText(el, n2.children)
    } else if (Array.isArray(n2.children)) {
      if (Array.isArray(n1.children)) {
        n1.children.forEach((child) => unmount(child))
        n2.children.forEach((child) => patch(null, child, el))
      } else {
        setElementText(el, '')
        n2.children.forEach((child) => patch(null, child, el))
      }
    } else {
      if (Array.isArray(n1.children)) {
        n1.children.forEach((child) => unmount(child))
      } else if (typeof n1.children === 'string') {
        setElementText(el, '')
      }
    }
  }

  return {
    render,
  }
}
