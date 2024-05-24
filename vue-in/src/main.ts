import { effect, reactive, ref, shallowReactive } from '@vue/reactivity'

function lis(arr) {
  const p = arr.slice()
  const result = [0]
  let i, j, u, v, c
  const len = arr.length
  for (i = 0; i < len; i++) {
    const arrI = arr[i]
    if (arrI !== 0) {
      j = result[result.length - 1]
      if (arr[j] < arrI) {
        p[i] = j
        result.push(i)
        continue
      }
      u = 0
      v = result.length - 1
      while (u < v) {
        c = ((u + v) / 2) | 0
        if (arr[result[c]] < arrI) {
          u = c + 1
        } else {
          v = c
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1]
        }
        result[u] = i
      }
    }
  }
  u = result.length
  v = result[u - 1]
  while (u-- > 0) {
    result[u] = v
    v = p[v]
  }
  return result
}

const queue = new Set()
let isFlushing = false
const p = Promise.resolve()
function queueJob(job) {
  queue.add(job)
  if (!isFlushing) {
    isFlushing = true
    p.then(() => {
      try {
        queue.forEach((job) => job())
      } catch (error) {
        isFlushing = false
        queue.clear()
      }
    })
  }
}

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
    // 处理前置
    let j = 0
    let oldVNode = oldChildren[j]
    let newVNode = newChildren[j]
    while (oldVNode.key === newVNode.key) {
      patch(oldVNode, newVNode, container)
      j++
      oldVNode = oldChildren[j]
      newVNode = newChildren[j]
    }
    // 处理后置
    let oldEnd = oldChildren.length - 1
    let newEnd = newChildren.length - 1
    let oldEndVNode = oldChildren[oldEnd]
    let newEndVNode = newChildren[newEnd]
    while (oldEndVNode.key === newEndVNode.key) {
      patch(oldEndVNode, newEndVNode, container)
      oldEndVNode = oldChildren[--oldEnd]
      newEndVNode = newChildren[--newEnd]
    }

    // 判断遗留
    if (oldEnd < j && j <= newEnd) {
      const anchorIndex = newEnd + 1
      const anchor = anchorIndex < newChildren.length ? newChildren[anchorIndex].el : null
      for (let i = j; i <= newEnd; i++) {
        patch(null, newChildren[i], container, anchor)
      }
    } else if (newEnd < j && j <= oldEnd) {
      // 又遗留的旧节点
      for (let i = j; i <= oldEnd; i++) {
        unmount(oldChildren[i])
      }
    } else {
      log('快速DIFF', '不理想情况')
      const count = newEnd - j + 1
      const source = new Array(count)
      source.fill(-1)
      // source 数组用来存储新的子节点在旧子节点中索引，
      // 后面用它生成一个递增子序列 辅助DOM移动
      const oldStart = j
      const newStart = j
      // 新增两个变量，moved 和 pos
      // 代表是否需要移动节点
      let moved = false
      // 代表遍历旧的一组子节点的过程中遇到的最大索引值 k
      let pos = 0

      let keyIndex = new Map()
      for (let i = j; i <= newEnd; i++) {
        keyIndex.set(newChildren[i].key, i)
      }
      // 新增 patched 变量，代表更新过的节点数量
      let patched = 0

      for (let i = j; i <= oldEnd; i++) {
        const oldVNode = oldChildren[i]
        // 如果更新过的节点数量小于等于需要更新的节点数量，则执行更新
        if (patched <= count) {
          // 通过索引表快速找到新的一组子节点中具有相同 key 值的节点位置

          const newVNodeIdx = keyIndex.get(oldVNode.key)
          if (newVNodeIdx) {
            const newVNode = newChildren[newVNodeIdx]
            patch(oldVNode, newVNode, container)
            // 每更新一个节点，都将 patched 变量 +1
            patched++
            source[newVNodeIdx - j] = i
            // 判断是否需要移动
            if (newVNodeIdx < pos) {
              moved = true
            } else {
              pos = newVNodeIdx
            }
          } else {
            log('快速DIFF', '没找到')
            unmount(oldVNode)
          }
        } else {
          // 如果更新过的节点数量大于需要更新的节点数量，则卸载多余的节点
          unmount(oldVNode)
        }

        // for (let k = j; k <= newEnd; k++) {
        //   const newVNode = newChildren[k]
        //   if (oldVNode.key === newVNode.key) {
        //     patch(oldVNode, newVNode, container)
        //     source[k - j] = i
        //   }
        // }
      }
      console.log('source', source)

      if (moved) {
        // 如果 moved 为真，则需要进行 DOM 移动操作
        // 计算最长递增子序列
        const seq = lis(source)
        log('快速DIFF', '计算最长递增子序列', seq)
        /** @description s 指向最长递增子序列的最后一个元素 */
        let s = seq.length - 1
        /** @description i 指向新的一组子节点的最后一个元素 */
        let i = count - 1
        // for 循环使得 i 递减，即按照图 11-24 中箭头的方向移动
        for (i; i >= 0; i--) {
          if (source[i] === -1) {
            // 全新节点挂载
            log('快速DIFF', '全新节点挂载')
            // 该节点在新 children 中的真实位置索引
            const pos = i + newStart
            const newVNode = newChildren[pos]
            const nextPos = pos + 1
            const anchor = nextPos < newChildren.length ? newChildren[nextPos].el : null
            patch(null, newVNode, container, anchor)
          } else if (i !== seq[s]) {
            log('快速DIFF', '如果节点的索引 i 不等于 seq[s] 的值，说明该节点需要移动')
            const pos = i + newStart
            const newVNode = newChildren[pos]
            const nextPos = pos + 1
            const anchor = nextPos < newChildren.length ? newChildren[nextPos].el : null
            insert(newVNode.el, container, anchor)
          } else {
            log('快速DIFF', '当 i === seq[s] 时，说明该位置的节点不需要移动')
            // 当 i === seq[s] 时，说明该位置的节点不需要移动
            // 只需要让 s 指向下一个位置
            s--
          }
        }
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
      // vnode.type 的值是选项对象，作为组件来处理
      if (!n1) {
        mountComponent(n2, container, anchor)
      } else {
        patchComponent(n1, n2, anchor)
      }
    }
  }
  // resolveProps 函数用于解析组件 props 和 attrs 数据
  function resolveProps(options, propsData) {
    const props = {}
    const attrs = {}
    for (const key in propsData) {
      if (key in options) {
        props[key] = propsData[key]
      } else {
        attrs[key] = propsData[key]
      }
    }
    return [props, attrs]
  }

  function mountComponent(vnode, container, anchor) {
    console.log('mountComponent')
    const componentOptions = vnode.type
    // 从组件选项对象中取得组件的生命周期函数
    const {
      props: propsOption,
      render,
      data,
      beforeCreate,
      created,
      beforeMount,
      mounted,
      beforeUpdate,
      updated,
    } = componentOptions

    beforeCreate && beforeCreate()

    const state = reactive(data())
    const [props, attrs] = resolveProps(propsOption, vnode.props)

    // 定义组件实例，一个组件实例本质上就是一个对象，它包含与组件有关的状态信息
    const instance = {
      state,
      isMounted: false,
      // 组件所渲染的内容，即子树（subTree）
      subTree: null,
      props: shallowReactive(props),
    }

    console.log('instance', instance)

    vnode.component = instance

    created && created.call(state)

    // 当组件自身状态发生变化时，我们需要有能力触发组件更新，
    // 即组件的自更新。为此，我们需要将整个渲染任务包装到一个 effect中
    effect(
      () => {
        const subTree = render.call(state, state)
        console.log('subTree', subTree)
        if (!instance.isMounted) {
          beforeMount && beforeMount.call(state)
          patch(null, subTree, container, anchor)
          instance.isMounted = true
          mounted && mounted.call(state)
        } else {
          beforeUpdate && beforeUpdate.call(state)
          patch(instance.subTree, subTree, container, anchor)
          updated && updated.call(state)
        }
        instance.subTree = subTree
      },
      {
        // scheduler: queueJob,
      }
    )
  }
  function patchComponent(n1, n2, anchor) {
    console.log('patchComponent')
    const instance = (n2.component = n1.component)
    const { props } = instance

    if (hasPropsChanged(n1.props, n2.props)) {
      // 调用 resolveProps 函数重新获取 props 数据
      const [nextProps] = resolveProps(n2.type.props, n2.props)
      for (const k in nextProps) {
        props[k] = nextProps[k]
      }
      for (const k in props) {
        if (!(k in nextProps)) delete props[k]
      }
    }
  }

  function hasPropsChanged(prevProps, nextProps) {
    // debugger
    const nextKeys = Object.keys(nextProps)
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
            // console.log(e.timeStamp)
            // console.log(invoker.attached)
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

const MyComponent = {
  name: 'MyComponent',
  props: {
    title: String,
  },
  data() {
    return {
      count: 0,
    }
  },
  beforeCreate() {
    console.log('beforeCreate')
  },
  created() {
    console.log('created')
  },
  beforeMount() {
    console.log('beforeMount')
  },
  mounted() {
    console.log('mounted')
  },
  beforeUpdate() {
    console.log('beforeUpdate')
  },
  updated() {
    console.log('updated')
  },
  render() {
    return {
      type: 'div',
      props: {
        onClick: () => {
          this.count = this.count + 1
        },
      },
      children: `foo 的值是: ${this.count} ${this.title}`,
    }
  },
}

const CompVNode = {
  type: MyComponent,
  props: {
    title: 'A big Title',
    other: '1',
  },
}
renderer.render(CompVNode, document.querySelector('#app'))

setTimeout(() => {
  const CompVNode = {
    type: MyComponent,
    props: {
      title: 'A big Title',
      other: '2',
    },
  }
  renderer.render(CompVNode, document.querySelector('#app'))
}, 1000)
