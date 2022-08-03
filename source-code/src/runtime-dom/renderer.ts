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
    const newChildren = n2.children
    const oldChildren = n1.children
    let j = 0
    // 前置
    let oldVNode = oldChildren[j] as VNode
    let newVNode = newChildren[j] as VNode
    while (oldVNode.key === newVNode.key) {
      patch(oldVNode, newVNode, container)
      j++
      oldVNode = oldChildren[j]
      newVNode = newChildren[j]
    }
    // 后置
    let oldEnd = oldChildren?.length - 1
    let newEnd = newChildren?.length - 1
    oldVNode = oldChildren[oldEnd]
    newVNode = newChildren[newEnd]
    while (oldVNode.key === newVNode.key) {
      patch(oldVNode, newVNode, container)
      oldEnd--
      newEnd--
      oldVNode = oldChildren[oldEnd]
      newVNode = newChildren[newEnd]
    }
    if (j > oldEnd && j <= newEnd) {
      const anchorIndex = newEnd + 1
      const anchor = anchorIndex < newChildren?.length ? newChildren[anchorIndex].el : null
      while (j <= newEnd) {
        patch(null, newChildren[j++], container, anchor)
      }
    } else if (j > newEnd && j <= oldEnd) {
      while (j <= oldEnd) {
        unmount(oldChildren[j++])
      }
    } else {
      // 新的子节点中未处理的节点数量
      const count = newEnd - j + 1
      const source = new Array(count)
      source.fill(-1)
      const oldStart = j
      const newStart = j
      // 构建索引表
      const keyIndex = {}
      for (let i = newStart; i <= newEnd; i++) {
        keyIndex[newChildren[i].key] = i
      }
      console.log('keyIndex :>> ', keyIndex)
      for (let i = oldStart; i <= oldEnd; i++) {
        const oldVNode = oldChildren[i]
        const k = keyIndex[oldVNode.key]
        if (typeof k !== 'undefined') {
          newVNode = newChildren[k]
          patch(oldVNode, newVNode, container)
          source[k - newStart] = i
        } else {
          unmount(oldVNode)
        }
      }
      console.log(source)
    }
  }

  return {
    render,
  }
}
