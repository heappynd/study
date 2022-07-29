import { options } from './dom'
import { VNode } from './vnode'
import { Text, Comment, Fragment } from './vnode'

type RendererElement = HTMLElement & {
  _vnode?: VNode
  /** vue event invoker */
  _vei?: {
    value: () => void
    [key: string]: (e: any) => void
  }
}

function unmount(vnode: VNode) {
  // 在卸载时 如果是Fragment类型 则需要卸载其children
  if (vnode.type === Fragment) {
    vnode.children.forEach((c) => unmount(c))
    return
  }
  const parent = vnode.el.parentNode
  if (parent) {
    parent.removeChild(vnode.el)
  }
}

export function createRenderer() {
  const { createElement, setElementText, insert, createText, setText, patchProps } = options

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
        console.log('patchElement')
        patchElement(n1, n2)
      }
    } else if (typeof type === 'object') {
      // todo 是对象描述的是组件
    } else if (type === Text) {
      // 文本节点
      if (!n1) {
        // 没有旧节点
        const el = (n2.el = createText(n2.children))
        insert(el, container)
      } else {
        // 如果旧vnode存在
        const el = (n2.el = n1.el)
        if (n2.children !== n1.children) {
          setText(el, n2.children)
        }
      }
    } else if (type === Fragment) {
      if (!n1) {
        n2.children.forEach((c) => patch(null, c, container))
      } else {
        patchChildren(n1, n2, container)
      }
    }
  }

  function patchElement(n1: VNode, n2: VNode) {
    const el = (n2.el = n1.el)
    const oldProps = n1.props
    const newProps = n2.props

    // 更新props
    for (const key in newProps) {
      if (newProps[key] !== oldProps[key]) {
        patchProps(el, key, oldProps[key], newProps[key])
      }
    }
    for (const key in oldProps) {
      if (!(key in newProps)) {
        patchProps(el, key, oldProps[key], null)
      }
    }
    // 更新children
    patchChildren(n1, n2, el)
  }

  function patchChildren(n1: VNode, n2: VNode, container: RendererElement) {
    // 判断新子节点的类型是否是文本节点
    if (typeof n2.children === 'string') {
      // 旧子节点类型 三种 没有子节点 文本子节点 一组子节点
      // 当旧节点为一组子节点时 才需要逐个卸载 其他情况什么都不做
      if (Array.isArray(n1.children)) {
        n1.children.forEach((c) => unmount(c))
      }
      setElementText(container, n2.children)
    } else if (Array.isArray(n2.children)) {
      // 说明新子节点 也是一组子节点
      if (Array.isArray(n1.children)) {
        // 旧节点也是一组子节点 ⭐️核心Diff算法
        // FIXME: 傻瓜式 把旧的全部删掉 然后将子节点挂载到容器中
        // n1.children.forEach((c) => unmount(c))
        // n2.children.forEach((c) => patch(null, c, container))

        const oldChildren = n1.children
        const newChildren = n2.children

        let lastIndex = 0
        for (let i = 0; i < newChildren.length; i++) {
          const newVNode = newChildren[i]
          for (let j = 0; j < oldChildren.length; j++) {
            const oldVNode = oldChildren[j]
            if (newVNode.key === oldVNode.key) {
              patch(oldVNode, newVNode, container)
              if (j < lastIndex) {
                // 如果找到的节点 在旧children中索引小于最大索引值lastIndex
                // 说明该节点对应的真实dom需要移动
                const prevVNode = newChildren[i - 1]
                if (prevVNode) {
                  const anchor = prevVNode.el?.nextSibling
                  insert(newVNode.el, container, anchor)
                }
              } else {
                // 如果当前找到的节点在旧children中索引不小于最大索引值 则更新
                lastIndex = j
              }
              break
            }
          }
        }
      } else {
        // 这时子节点要么是文本子节点 要么不存在
        // 都只需要把他清空 让后逐个挂载新的子节点数组
        setElementText(container, '')
        n2.children.forEach((c) => patch(null, c, container))
      }
    } else {
      // 新子节点不存在 三种情况
      if (Array.isArray(n1.children)) {
        n1.children.forEach((c) => unmount(c))
      } else if (typeof n1.children === 'string') {
        setElementText(container, '')
      }
      // 如果也没有旧节点什么都不做
    }
  }

  function mountElement(vnode: VNode, container: RendererElement) {
    // 让vnode.el引用真实DOM元素
    const el = (vnode.el = createElement(vnode.type))
    if (typeof vnode.children === 'string') {
      setElementText(el, vnode.children)
    } else if (Array.isArray(vnode.children)) {
      vnode.children.forEach((child) => {
        patch(null, child, el)
      })
    }

    if (vnode.props) {
      for (const key in vnode.props) {
        patchProps(el, key, null, vnode.props[key])
      }
    }

    insert(el, container)
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
