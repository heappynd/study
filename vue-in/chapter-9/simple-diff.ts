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
        // 核心 diff
        // n1.children.forEach((c) => unmount(c))
        // n2.children.forEach((c) => patch(null, c, container))

        const oldChildren = n1.children
        const newChildren = n2.children

        let lastMaxIndex = 0

        for (let i = 0; i < newChildren.length; i++) {
          const newVNode = newChildren[i]

          let find = false

          for (let j = 0; j < oldChildren.length; j++) {
            const oldVNode = oldChildren[j]

            if (newVNode.key === oldVNode.key) {
              find = true

              patch(oldVNode, newVNode, container)
              if (j < lastMaxIndex) {
                // 如果找到的节点在旧children的索引值小于最大索引值
                // 表示需要移动
                const prevVNode = newChildren[i - 1]
                if (prevVNode) {
                  const anchor = prevVNode.el.nextSibling
                  insert(newVNode.el, container, anchor)
                }
              } else {
                lastMaxIndex = j
              }

              break
            }
          }

          // 在旧节点中没找到对应的
          if (!find) {
            const prevVNode = newChildren[i - 1]
            let anchor = null
            if (prevVNode) {
              anchor = prevVNode.el.nextSibling
            } else {
              anchor = container.firstChild
            }

            patch(null, newVNode, container, anchor)
          }
        }

        // 找到新节点没有 但旧节点中有的
        for (let i = 0; i < oldChildren.length; i++) {
          const oldVNode = oldChildren[i]
          const has = newChildren.find((vnode) => vnode.key === oldVNode.key)
          if (!has) {
            unmount(oldVNode)
          }
        }
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
  ],
}
renderer.render(oldVnode, document.querySelector('#app'))

const newVnode = {
  type: 'div',
  children: [
    // { type: 'p', children: '4', key: 4 },
    { type: 'p', children: '3', key: 3 },
    // { type: 'p', children: '1', key: 1 },
    // { type: 'p', children: '2', key: 2 },
  ],
}

setTimeout(() => {
  renderer.render(newVnode, document.querySelector('#app'))
}, 2000)
