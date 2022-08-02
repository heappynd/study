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
  function patch(n1: VNode | undefined | null, n2: VNode, container: Container, anchor?: Node) {
    if (n1 && n1.type !== n2.type) {
      // 描述不同
      unmount(n1)
      n1 = null
    }

    const type = n2.type
    if (typeof type === 'string') {
      if (!n1) {
        // mountElement
        mountElement(n2, container, anchor)
      } else {
        // 新旧 都存在 vnode
        patchElement(n1, n2)
      }
    } else if (type === 'xxx') {
      // TODO
    }
  }

  function mountElement(vnode: VNode, container: Container, anchor?: Node) {
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

    insert(el, container, anchor)
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
        patchKeyedChildren(n1, n2, el)
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

  function patchKeyedChildren(n1: VNode, n2: VNode, container: Container) {
    const oldChildren = n1.children
    const newChildren = n2.children
    let oldStartIdx = 0
    let oldEndIdx = oldChildren!.length - 1
    let newStartIdx = 0
    let newEndIdx = newChildren!.length - 1
    let oldStartVNode = oldChildren[oldStartIdx]
    let oldEndVNode = oldChildren[oldEndIdx]
    let newStartVNode = newChildren[newStartIdx]
    let newEndVNode = newChildren[newEndIdx]

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      // debugger
      if (!oldStartVNode) {
        oldStartVNode = oldChildren[++oldStartIdx]
      } else if (!oldEndVNode) {
        oldEndVNode = oldChildren[--oldEndIdx]
      } else if (oldStartVNode.key === newStartVNode.key) {
        console.log('新前 旧前')
        patch(oldEndVNode, newEndVNode, container)
        newStartVNode = newChildren[++newStartIdx]
        oldStartVNode = oldChildren[++oldStartIdx]
      } else if (newEndVNode.key === oldEndVNode.key) {
        console.log('新后 旧后')
        patch(oldEndVNode, newEndVNode, container)
        newEndVNode = newChildren[--newEndIdx]
        oldEndVNode = oldChildren[--oldEndIdx]
      } else if (newEndVNode.key === oldStartVNode.key) {
        console.log('新后 旧前')
        patch(oldStartVNode, newEndVNode, container)
        insert(oldStartVNode.el, container, oldEndVNode.el.nextSibling)
        oldStartVNode = oldChildren[++oldStartIdx]
        newEndVNode = newChildren[--newEndIdx]
      } else if (newStartVNode.key === oldEndVNode.key) {
        console.log('新前 旧后')
        patch(oldEndVNode, newStartVNode, container)
        insert(oldEndVNode.el, container, oldStartVNode.el)
        oldEndVNode = oldChildren[--oldEndIdx]
        newStartVNode = newChildren[++newStartIdx]
      } else {
        console.log('no')
        const idxInOld = oldChildren.findIndex((node) => node.key === newStartVNode.key)
        console.log(idxInOld)

        if (idxInOld > 0) {
          const vnodeToMove = oldChildren[idxInOld]
          patch(vnodeToMove, newStartIdx, container)
          insert(vnodeToMove.el, container, oldStartVNode.el)
          oldChildren[idxInOld] = undefined
          newStartVNode = newChildren[++newStartIdx]
        } else {
          patch(null, newStartVNode, container, oldStartVNode.el)
        }

        debugger
      }
    }

    if (oldEndIdx < oldStartIdx && newStartIdx <= newEndVNode) {
      // 说明有新的节点遗漏
      for (let i = newStartIdx; i <= newEndIdx; i++) {
        patch(null, newChildren[i], container, oldStartVNode.el)
      }
    } else if (newEndIdx < newStartIdx && oldStartIdx <= oldEndIdx) {
      for (let i = oldStartIdx; i <= oldEndIdx; i++) {
        unmount(oldChildren[i])
      }
    }
  }

  return {
    render,
  }
}
