import { VNode } from './vnode'

type RendererElement = HTMLElement & {
  _vnode?: VNode
  /** vue event invoker */
  _vei?: {
    value: () => void
    [key: string]: (e: any) => void
  }
}

function shouldSetAsProps(el: RendererElement, key: string, value: any) {
  // 特殊处理
  if (key === 'form' && el.tagName === 'INPUT') {
    return false
  }
  // 兜底
  return key in el
}

function patchProps(el, key, prevValue, nextValue) {
  if (/^on/.test(key)) {
    // 获取为该元素伪造的事件处理函数 invoker
    const invokers = el._vei || (el._vei = {})
    let invoker = invokers[key]
    // 匹配事件
    const name = key.slice(2).toLowerCase()
    if (nextValue) {
      if (!invoker) {
        // 如果没有invoker 将一个伪造的invoker缓存到el._vei中
        invoker = el._vei[key] = (e) => {
          // 当伪造的事件处理函数执行时 会执行真正的事件处理函数
          if (Array.isArray(invoker.value)) {
            invoker.value.forEach((fn) => fn(e))
          } else {
            invoker.value(e)
          }
        }
        invoker.value = nextValue
        // 绑定invoker 作为事件处理函数
        el.addEventListener(name, invoker)
      } else {
        invoker.value = nextValue
      }
    } else if (invoker) {
      // 新的事件绑定函数不存在 且之前绑定的invoker存在 则移除绑定
      el.removeEventListener(name, invoker)
    }
  } else if (key === 'class') {
    // todo normalizeClass 源码在 @vue/shared
    el.className = nextValue || ''
  } else if (shouldSetAsProps(el, key, nextValue)) {
    const type = typeof el[key]
    if (typeof type === 'boolean' && nextValue === '') {
      el[key] = true
    } else {
      el[key] = nextValue
    }
  } else {
    el.setAttribute(key, nextValue)
  }
}

function setElementText(el: HTMLElement, text: string) {
  el.textContent = text
}

export function createRenderer() {
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
    } else if (type === 'xxx') {
      // todo 处理其他type
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
        n1.children.forEach((c) => unmount(c))
        n2.children.forEach((c) => patch(null, c, container))
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
    const el = (vnode.el = document.createElement(vnode.type) as RendererElement)
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

    container.appendChild(el)
  }

  function unmount(vnode: VNode) {
    const parent = vnode.el.parentNode
    if (parent) {
      parent.removeChild(vnode.el)
    }
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
