import { options } from './custom'
import { getSequence } from './utils'
import { VNode, Container } from './vnode'
import { effect, reactive } from '../reactivity'
import { shallowReactive } from '../reactivity/reactive'

function resolveProps(options, propsData) {
  const props = {}
  const attrs = {}
  for (const key in propsData) {
    if ((options && key in options) || key.startsWith('on')) {
      props[key] = propsData[key]
    } else {
      attrs[key] = propsData[key]
    }
  }

  return [props, attrs]
}

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
    } else if (typeof type === 'object') {
      // TODO
      if (!n1) {
        mountComponent(n2, container, anchor)
      } else {
        patchComponent(n1, n2, container)
      }
    }
  }

  const queue = new Set()
  let isFlushing = false
  const p = Promise.resolve()

  function queueJob(job) {
    // console.log(job)

    queue.add(job)
    if (!isFlushing) {
      isFlushing = true
      p.then(() => {
        try {
          queue.forEach((job) => job())
        } finally {
          isFlushing = false
          queue.clear()
        }
      })
    }
  }

  function mountComponent(vnode, container, anchor) {
    const componentOptions = vnode.type
    const {
      data,
      beforeCreate,
      created,
      beforeMount,
      mounted,
      beforeUpdate,
      updated,
      props: propsOption,
      setup,
    } = componentOptions

    let render = componentOptions.render

    console.log('componentOptions :>> ', componentOptions)

    beforeCreate && beforeCreate()

    const state = data ? reactive(data()) : null

    const [props, attrs] = resolveProps(propsOption, vnode.props)

    // 定义组件实例
    const instance = {
      state,
      props: shallowReactive(props),
      isMounted: false,
      subTree: null,
    }

    function emit(event: string, ...payload) {
      const eventName = `on${event[0].toUpperCase() + event.slice(1)}`
      const handler = instance.props[eventName]
      if (handler) {
        handler(...payload)
      } else {
        console.error('事件不存在')
      }
    }

    const setupContext = { attrs, emit }
    // setup
    const setupResult = setup(shallowReactive(props), setupContext)
    let setupState = null
    if (typeof setupResult === 'function') {
      // setup 函数返回值是函数，则将其作为渲染函数
      if (render) {
        console.warn('setup 函数返回渲染函数, render选项被忽略')
      }
      render = setupResult
    } else {
      setupState = setupResult
    }

    vnode.component = instance

    // 创建渲染上下文
    const renderContext = new Proxy(instance, {
      get(t, k, r) {
        const { state, props } = t
        if (state && k in state) {
          return state[k]
        } else if (k in props) {
          return props[k]
        } else if (setupState && k in setupState) {
          return setupState[k]
        } else {
          console.error('不存在')
        }
      },
      set(t, k, v, r) {
        const { state, props } = t
        if (state && k in state) {
          state[k] = v
        } else if (k in props) {
          console.warn(`Attempting to mutate prop "${k}".Props are readonly.`)
        } else if (setupState && k in setupState) {
          setupState[k] = v
        } else {
          console.error('不存在')
        }
      },
    })

    created && created.call(renderContext)

    effect(
      () => {
        const subTree = render.call(renderContext, renderContext)

        if (!instance.isMounted) {
          beforeMount && beforeMount()
          patch(null, subTree, container, anchor)
          mounted && mounted()
          instance.isMounted = true
        } else {
          beforeUpdate && beforeUpdate()
          patch(instance.subTree, subTree, container, anchor)
          updated && updated()
        }
        instance.subTree = subTree
      },
      { scheduler: queueJob }
    )
  }

  function patchComponent(n1, n2, container) {
    const instance = (n2.component = n1.component)
    const { props } = instance
    if (hasPropsChanged(n1.props, n2.props)) {
      const [nextProps] = resolveProps(n2.type.props, n2.props)
      for (const k in nextProps) {
        props[k] = nextProps[k]
      }
      for (const k in props) {
        if (!(k in nextProps)) {
          delete props[k]
        }
      }
    }
  }

  function hasPropsChanged(prevProps, nextProps) {
    const nextKeys = Object.keys(nextProps)
    // 新旧props数量变化
    if (nextKeys.length !== Object.keys(prevProps).length) {
      return true
    }
    for (let i = 0; i < nextKeys.length; i++) {
      const key = nextKeys[i]
      if (nextProps[key] !== prevProps[key]) {
        return true
      }
    }
    return false
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
      let moved = false
      let pos = 0
      // 构建索引表
      const keyIndex = {}
      for (let i = newStart; i <= newEnd; i++) {
        keyIndex[newChildren[i].key] = i
      }
      // 代表更新过的节点数量
      let patched = 0
      console.log('keyIndex :>> ', keyIndex)
      for (let i = oldStart; i <= oldEnd; i++) {
        const oldVNode = oldChildren[i]
        if (patched <= count) {
          const k = keyIndex[oldVNode.key]
          if (typeof k !== 'undefined') {
            newVNode = newChildren[k]
            patch(oldVNode, newVNode, container)
            // 每更新一个节点 都将patched变量+1
            patched++
            source[k - newStart] = i
            // 判断节点是否需要移动
            if (k < pos) {
              moved = true
            } else {
              pos = k
            }
          } else {
            unmount(oldVNode)
          }
        } else {
          unmount(oldVNode)
        }
      }
      console.log(source)

      if (moved) {
        // 如果moved为真 则需要进行DOM移动操作
        const seq = getSequence(source)
        console.log('seq :>> ', seq)
        let s = seq.length - 1
        let i = count - 1
        for (i; i >= 0; i--) {
          if (source[i] === -1) {
            const pos = i + newStart
            const newVNode = newChildren[pos]
            const nextPos = pos + 1
            const anchor = nextPos < newChildren?.length ? newChildren[nextPos].el : null
            patch(null, newVNode, container, anchor)
          }

          if (i != seq[s]) {
            // 不等于seq[s]表示要移动
            const pos = i + newStart
            const newVNode = newChildren[pos]
            const nextPos = pos + 1
            const anchor = nextPos < newChildren?.length ? newChildren[nextPos].el : null
            insert(newVNode.el, container, anchor)
          } else {
            // 不需要移动
            s--
          }
        }
      }
    }
  }

  return {
    render,
  }
}
