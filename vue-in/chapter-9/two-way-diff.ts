function shouldSetAsProps(el, key, value) {
  if (key === 'form' && el.tagName === 'INPUT') return false
  return key in el
}

function log(scope: string, ...data: any[]) {
  console.log(`[${scope}]`, ...data)
}

function createRenderer(options) {
  const { createElement, insert, setElementText, patchProps } = options

  function mountElement(vnode, container, anchor) {
    log('mountElement', vnode, 'to', container)

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

    insert(el, container, anchor)
  }

  function patchChildren(n1, n2, container) {
    console.log('oldChildren', n1.children, 'newChildren', n2.children)

    if (typeof n2.children === 'string') {
      if (Array.isArray(n1.children)) {
        n1.children.forEach((c) => unmount(c))
      }
      setElementText(container, n2.children)
    } else if (Array.isArray(n2.children)) {
      if (Array.isArray(n1.children)) {
        patchKeyedChildren(n1, n2, container)
      } else {
        setElementText(container, '')
        n2.children.forEach((c) => patch(null, c, container))
      }
    } else {
      if (Array.isArray(n1.children)) {
        n1.children.forEach((c) => unmount(c))
      } else if (typeof n1.children === 'string') {
        setElementText(container, '')
      }
    }
  }
  // 双端 DIFF
  // 1. 新前 旧前
  // 2. 新后 旧后
  // 3. 新后 旧前
  // 4. 新前 旧后
  function patchKeyedChildren(n1, n2, container) {
    const oldChildren = n1.children
    const newChildren = n2.children
    // 四个索引值
    let oldStartIdx = 0
    let oldEndIdx = oldChildren.length - 1
    let newStartIdx = 0
    let newEndIdx = newChildren.length - 1
    // 四个索引指向的 vnode 节点
    let oldStartVNode = oldChildren[oldStartIdx]
    let oldEndVNode = oldChildren[oldEndIdx]
    let newStartVNode = newChildren[newStartIdx]
    let newEndVNode = newChildren[newEndIdx]

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      // 增加两个判断分支，如果头尾部节点为 undefined，则说明该节点已经被处理
      // 过了，直接跳到下一个位置
      if (!oldStartVNode) {
        log('双端DIFF', '头部节点为 undefined，则说明该节点已经被处理')
        oldStartVNode = oldChildren[++oldStartIdx]
      } else if (!oldEndVNode) {
        log('双端DIFF', '尾部节点为 undefined，则说明该节点已经被处理')
        oldEndVNode = oldChildren[--oldEndIdx]
      } else if (newStartVNode.key === oldStartVNode.key) {
        log('双端DIFF', '匹配新前 旧前')

        patch(oldStartVNode, newStartVNode, container)
        newStartVNode = newChildren[++newStartIdx]
        oldStartVNode = oldChildren[++oldStartIdx]
      } else if (newEndVNode.key === oldEndVNode.key) {
        log('双端DIFF', '匹配 新后 旧后')
        patch(oldEndVNode, newEndVNode, container)
        newEndVNode = newChildren[--newEndIdx]
        oldEndVNode = oldChildren[--oldEndIdx]
      } else if (newEndVNode.key === oldStartVNode.key) {
        log('双端DIFF', '匹配 新后 旧前, 说明是原来是头部节点，后面变成了尾部节点，于是把他移动到尾部')
        patch(oldStartVNode, newEndVNode, container)
        const anchor = oldEndVNode.el.nextSibling
        insert(oldStartVNode.el, container, anchor)
        newEndVNode = newChildren[--newEndIdx]
        oldStartVNode = oldChildren[++oldStartIdx]
      } else if (newStartVNode.key === oldEndVNode.key) {
        log('双端DIFF', '匹配 新前 旧后, 说明原来处于尾部的节点在新的顺序中应该处于头部，于是把他移到开头')
        patch(oldEndVNode, newStartVNode, container)
        const anchor = oldStartVNode.el
        insert(oldEndVNode.el, container, anchor)

        newStartVNode = newChildren[++newStartIdx]
        oldEndVNode = oldChildren[--oldEndIdx]
      } else {
        log('双端DIFF', '都没找到')
        const idxInOld = oldChildren.findIndex((vnode) => vnode.key === newStartVNode.key)
        if (idxInOld > 0) {
          log('双端DIFF', '循环旧节点找到了与新头部节点')
          const vnodeToMove = oldChildren[idxInOld]
          patch(vnodeToMove, newStartVNode, container)
          const anchor = oldStartVNode.el
          insert(vnodeToMove.el, container, anchor)
          //  由于位置 idxInOld 处的节点所对应的真实 DOM 已经移动到了别处，因此将其设置为 undefined
          oldChildren[idxInOld] = undefined
        } else {
          log('双端DIFF', '循环旧节点没有找到与新头部节点，则挂载新节点')
          const anchor = oldStartVNode.el
          patch(null, newStartVNode, container, anchor)
        }

        newStartVNode = newChildren[++newStartIdx]
      }
    }

    // 循环结束后 还要检查索引值情况
    if (oldEndIdx < oldStartIdx && newStartIdx <= newEndIdx) {
      log('双端DIFF', '如果满足条件，则说明有新的节点遗留，需要挂载它们')
      for (let i = newStartIdx; i <= newEndIdx; i++) {
        patch(null, newChildren[i], container, oldStartVNode.el)
      }
    } else if (oldStartIdx <= oldEndIdx && newEndIdx < newStartIdx) {
      log('双端DIFF', '如果满足条件，则说明有旧的节点遗留，需要卸载它们')
      for (let i = oldStartIdx; i <= oldEndIdx; i++) {
        unmount(oldChildren[i])
      }
    }
  }

  function patchElement(n1, n2) {
    const el = (n2.el = n1.el)
    const oldProps = n1.props
    const newProps = n2.props

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

    patchChildren(n1, n2, el)
  }

  function unmount(vnode) {
    log('unmount', vnode)

    const parent = vnode.el.parentNode
    if (parent) {
      parent.removeChild(vnode.el)
    }
  }

  function patch(n1, n2, container, anchor) {
    if (n1 && n1.type !== n2.type) {
      unmount(n1)
      n1 = null
    }

    const { type } = n2

    if (typeof type === 'string') {
      if (!n1) {
        mountElement(n2, container, anchor)
      } else {
        patchElement(n1, n2)
      }
    } else if (typeof type === 'object') {
      // 组件
    }
  }

  function render(vnode, container) {
    if (vnode) {
      // 新 vnode 存在，将其与旧 vnode 一起传递给 patch 函数进行打补丁
      patch(container._vnode, vnode, container)
    } else {
      if (container._vnode) {
        // 旧 vnode 存在，且新 vnode 不存在，说明是卸载(unmount)操作
        unmount(container._vnode)
      }
    }
    // 把 vnode 存储到 container._vnode 下，即后续渲染中的旧 vnode
    container._vnode = vnode
  }

  return {
    render,
  }
}

const renderer = createRenderer({
  createElement(tag) {
    return document.createElement(tag)
  },
  setElementText(el, text) {
    el.textContent = text
  },
  insert(el, parent, anchor = null) {
    parent.insertBefore(el, anchor)
  },
  patchProps(el, key, prevValue, nextValue) {
    if (/^on/.test(key)) {
      const invokers = el._vei || (el._vei = {})
      let invoker = invokers[key]
      const name = key.slice(2).toLowerCase()
      if (nextValue) {
        if (!invoker) {
          invoker = el._vei[key] = (e) => {
            console.log(e.timeStamp)
            console.log(invoker.attached)
            if (e.timeStamp < invoker.attached) return
            if (Array.isArray(invoker.value)) {
              invoker.value.forEach((fn) => fn(e))
            } else {
              invoker.value(e)
            }
          }
          invoker.value = nextValue
          invoker.attached = performance.now()
          el.addEventListener(name, invoker)
        } else {
          invoker.value = nextValue
        }
      } else if (invoker) {
        el.removeEventListener(name, invoker)
      }
    } else if (key === 'class') {
      el.className = nextValue || ''
    } else if (shouldSetAsProps(el, key, nextValue)) {
      const type = typeof el[key]
      if (type === 'boolean' && nextValue === '') {
        el[key] = true
      } else {
        el[key] = nextValue
      }
    } else {
      el.setAttribute(key, nextValue)
    }
  },
})

const oldVnode = {
  type: 'div',
  children: [
    { type: 'p', children: '1', key: 1 },
    { type: 'p', children: '2', key: 2 },
    { type: 'p', children: '3', key: 3 },
    // { type: 'p', children: '4', key: 4 },
  ],
}
renderer.render(oldVnode, document.querySelector('#app'))

const newVnode = {
  type: 'div',
  children: [
    // 双端DIFF 完美例子
    // { type: 'p', children: '4', key: 4 },
    // { type: 'p', children: '2', key: 2 },
    // { type: 'p', children: '1', key: 1 },
    // { type: 'p', children: '3', key: 3 },
    // 双端DIFF 不完美例子
    // { type: 'p', children: '2', key: 2 },
    // { type: 'p', children: '4', key: 4 },
    // { type: 'p', children: '1', key: 1 },
    // { type: 'p', children: '3', key: 3 },

    // 双端DIFF 不完美例子
    // { type: 'p', children: '4', key: 4 },
    // { type: 'p', children: '1', key: 1 },
    // { type: 'p', children: '2', key: 2 },
    // { type: 'p', children: '3', key: 3 },

    { type: 'p', children: '1', key: 1 },
    { type: 'p', children: '3', key: 3 },
  ],
}

setTimeout(() => {
  renderer.render(newVnode, document.querySelector('#app'))
}, 1000)
