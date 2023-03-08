import { describe, expect, it } from 'vitest'
import { createRenderer } from '../src'

describe('renderer', () => {
  it('basic', () => {
    const vnode1 = {
      type: 'h1',
      children: 'hello',
    }
    // 在创建 renderer 时传入配置项
    const renderer = createRenderer({
      // 用于创建元素
      createElement(tag) {
        console.log(`创建元素 ${tag}`)
        return { tag }
      },
      // 用于设置元素的文本节点
      setElementText(el, text) {
        console.log(`设置 ${JSON.stringify(el)} 的文本内容：${text}`)
        el.textContent = text
      },
      // 用于在给定的 parent 下添加指定元素
      insert(el, parent, anchor = null) {
        console.log(
          `将 ${JSON.stringify(el)} 添加到${JSON.stringify(parent)} 下`
        )
        parent.children = el
      },
    })
    let dummy = { type: 'root' }
    renderer.render(vnode1, dummy)
    expect(dummy).toEqual({
      type: 'root',
      children: { tag: 'h1', textContent: 'hello' },
      _vnode: { type: 'h1', children: 'hello' },
    })
  })

  it('value', () => {})
})
