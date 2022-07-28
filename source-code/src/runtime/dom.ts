function shouldSetAsProps(el: HTMLElement, key: string, value: any) {
  // 特殊处理
  if (key === 'form' && el.tagName === 'INPUT') {
    return false
  }
  // 兜底
  return key in el
}

function insert(el: Node, parent: HTMLElement, anchor = null) {
  parent.insertBefore(el, anchor)
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

function createElement(tag: string) {
  return document.createElement(tag)
}

function createText(text: string) {
  return document.createTextNode(text)
}
function setText(el: Text, text: string) {
  el.nodeValue = text
}

export const options = {
  createElement,
  setElementText,
  insert,
  createText,
  setText,
  patchProps,
}
