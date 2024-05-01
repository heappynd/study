function shouldSetAsProps(el, key, value) {
  if (key === 'form' && el.tagName === 'INPUT') return false
  return key in el
}

function createRenderer(options) {
  const { createElement, insert, setElementText, patchProps } = options

  function mountElement(vnode, container) {
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

    // 第二步：更新 children
    patchChildren(n1, n2, el)
  }

  function patchChildren(oldVNode, newVNode, container) {
    // 新 children 是文本节点
    if (typeof newVNode.children === 'string') {
      if (Array.isArray(n1.children)) {
        oldVNode.children.forEach((c) => unmount(c))
      }
      setElementText(container, newVNode.children)
    } else if (Array.isArray(newVNode.children)) {
      if (Array.isArray(oldVNode.children)) {
        // 新旧都有 children
        // diff
        oldVNode.children.forEach((c) => unmount(c))
        newVNode.children.forEach((c) => patch(null, c, container))
      } else {
        // 旧子节点要么是文本子节点，要么不存在
        // 但无论哪种情况，我们都只需要将容器清空，然后将新的一组子节点逐个挂
        // 载
        setElementText(container, '')
        newVNode.children.forEach((c) => patch(null, c, container))
      }
    } else {
      // 新子节点不存在
      if (Array.isArray(oldVNode.children)) {
        oldVNode.children.forEach((c) => unmount(c))
      } else if (typeof oldVNode.children === 'string') {
        setElementText(container, '')
      }
      // 如果也没有旧子节点，那么什么都不需要做
    }
  }

  function unmount(vnode) {
    const parent = vnode.el.parentNode
    if (parent) {
      parent.removeChild(vnode.el)
    }
  }

  function patch(n1, n2, container) {
    if (n1 && n1.type !== n2.type) {
      unmount(n1)
      n1 = null
    }

    const { type } = n2

    if (typeof type === 'string') {
      if (!n1) {
        mountElement(n2, container)
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
            // e.timeStamp 是事件发生的时间
            // 如果事件发生的时间早于事件回调被绑定的时间，则不执行回调
            console.log('invoker.attached', invoker.attached)
            if (e.timeStamp < invoker.attached) return
            if (Array.isArray(invoker.value)) {
              invoker.value.forEach((fn) => fn(e))
            } else {
              invoker.value(e)
            }
          }
          invoker.value = nextValue
          // 添加 invoker.attached 属性，存储事件回调被绑定的事件
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

const { effect, ref } = VueReactivity

const bol = ref(false)

effect(() => {
  const vnode = {
    type: 'div',
    props: bol.value
      ? {
          onClick: () => {
            console.log('click')
          },
        }
      : {},
    children: [
      {
        type: 'p',
        props: {
          onClick: () => {
            console.log('child click')
            bol.value = true
          },
        },
        children: 'text',
      },
    ],
  }
  renderer.render(vnode, document.querySelector('#app'))
})
