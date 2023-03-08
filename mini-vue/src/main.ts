import { createRenderer } from './renderer/src'
import { reactive, effect } from './reactivity/src'
import { normalizeClass, shouldSetAsProps } from './renderer/src/utils'

// test
const vnode1 = reactive({
  type: 'h1',
  // 使用 props 描述一个元素的属性
  props: {
    id: 'foo',
  },
  children: [
    {
      type: 'p',
      children: 'hello',
      props: {
        class: normalizeClass('foo bar'),
      },
    },
    {
      type: 'button',
      props: {
        disabled: '',
        class: normalizeClass({ foo: true, bar: false }),
      },
      children: 'click me',
    },
    {
      type: 'div',
      props: {
        class: normalizeClass(['foo bar', { baz: true }]),
      },
      children: 'div',
    },
  ],
})

// 在创建 renderer 时传入配置项
const renderer = createRenderer({
  // 用于创建元素
  createElement(tag) {
    return document.createElement(tag)
  },
  // 用于设置元素的文本节点
  setElementText(el, text) {
    el.textContent = text
  },
  // 用于在给定的 parent 下添加指定元素
  insert(el, parent, anchor = null) {
    parent.insertBefore(el, anchor)
  },
  // 将属性设置相关操作封装到 patchProps 函数中，并作为渲染器选项传递
  patchProps(el, key, prevValue, nextValue) {
    if (key === 'class') {
      el.className = nextValue || ''
    } else if (shouldSetAsProps(el, key, nextValue)) {
      // 获取该 DOM Properties 的类型
      const type = typeof el[key]
      if (type === 'boolean' && nextValue === '') {
        // 如果是布尔类型，并且 value 是空字符串，则将值矫正为 true
        el[key] = true
      } else {
        el[key] = nextValue
      }
    } else {
      // 如果要设置的属性没有对应的 DOM Properties，
      // 则使用setAttribute 函数设置属性
      el.setAttribute(key, nextValue)
    }
  },
})

effect(() => {
  console.log(1)

  renderer.render(vnode1, document.querySelector('#app'))
})

setTimeout(() => {
  vnode1.children = 'world'
}, 1000)

// renderer.render(vnode2, document.querySelector('#app'))
// renderer.render(null, document.querySelector('#app'))
