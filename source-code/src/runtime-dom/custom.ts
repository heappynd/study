import { Container, VNode } from './vnode'

export const options = {
  createElement(tag: string) {
    return document.createElement(tag)
  },
  setElementText(el: HTMLElement, text: string) {
    el.textContent = text
  },
  insert(el: HTMLElement, parent: HTMLElement, anchor = null) {
    parent.insertBefore(el, anchor)
  },
  patchProps(el: Container, key: string, prevValue: any, nextValue: any) {
    if (key.startsWith('on')) {
      const invokers = el._vei || (el._vei = {})
      let invoker = invokers[key]
      const name = key.slice(2).toLowerCase()
      if (nextValue) {
        if (!invoker) {
          invoker = el._vei[key] = (e: Event) => {
            if (e.timeStamp < invoker.attached) {
              return
            }
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
        // 新事件不存在 旧事件存在
        el.removeEventListener(name, invoker)
      }
    } else if (key === 'class') {
      el.className = nextValue || ''
    } else if (shouldSetAsProps(el, key)) {
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
  unmount(vnode: VNode) {
    const parent = vnode.el?.parentNode
    if (parent) {
      parent.removeChild(vnode.el!)
    }
  },
}

function shouldSetAsProps(el: HTMLElement, key: string) {
  if (key === 'form' && el.tagName === 'INPUT') {
    return false
  }
  return key in el
}
