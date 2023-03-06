import { describe, it, expect, vi } from 'vitest'
import { reactive } from '../src/collection'
import { effect } from '../src'

describe('collection', () => {
  it('map and set', () => {
    const s = new Set([1, 2, 3])
    const p = reactive(s)
    p.size
    // p.delete(1)
  })

  it('map and set proxy', () => {
    let dummy
    const p = reactive(new Set([1, 2, 3]))
    const fn = vi.fn(() => {
      dummy = p.size
    })
    effect(fn)
    p.add(4)
    expect(fn).toHaveBeenCalledTimes(2)
    p.add(1)
    expect(fn).toHaveBeenCalledTimes(2)
    p.delete(3)
    expect(fn).toHaveBeenCalledTimes(3)
    p.delete(5)
    expect(fn).toHaveBeenCalledTimes(3)
  })

  it('map', () => {
    const p = reactive(new Map([['key', 1]]))
    const fn = vi.fn(() => {
      p.get('key')
    })
    effect(fn)
    p.set('key', 2)
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('避免污染原始数据的问题', () => {
    const m = new Map()
    const p1 = reactive(m)
    const p2 = reactive(new Map())
    p1.set('p2', p2)
    const fn = vi.fn(() => {
      m.get('p2').size
    })
    effect(fn)
    m.get('p2').set('foo', 1)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('forEach,', () => {
    const p = reactive(new Map([[{ key: 1 }, { value: 1 }]]))
    const fn = vi.fn(() => {
      p.forEach(function (value, key, m) {
        value
        key
      })
    })
    effect(fn)
    p.set({ key: 2 }, { value: 2 })
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('forEach callback', () => {
    const key = { key: 1 }
    const value = new Set([1, 2, 3])
    const p = reactive(new Map([[key, value]]))
    const fn = vi.fn(() => {
      p.forEach(function (value, key) {
        value.size
      })
    })
    effect(fn)
    p.get(key).delete(1)
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('map forEach', () => {
    const p = reactive(new Map([['key', 1]]))
    const fn = vi.fn(() => {
      p.forEach(function (value, key) {
        // forEach 循环不仅关心集合的键，还关心集合的值
        value
      })
    })
    effect(fn)
    p.set('key', 2)
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('iterator', () => {
    const p = reactive(
      new Map([
        ['key1', 'value1'],
        ['key2', 'value2'],
      ])
    )
    const fn = vi.fn(() => {
      for (const [key, value] of p) {
        key
        value
      }
    })
    effect(fn)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('map for of', () => {
    const p = reactive(
      new Map([
        ['key1', 'value1'],
        ['key2', 'value2'],
      ])
    )
    const fn = vi.fn(() => {
      for (const [key, value] of p) {
        key
        value
      }
    })
    effect(fn)
    p.set('key3', 'value3')
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('map for of', () => {
    const p = reactive(
      new Map([
        ['key1', 'value1'],
        ['key2', 'value2'],
      ])
    )
    const fn = vi.fn(() => {
      for (const [key, value] of p.entries()) {
        key
        value
      }
    })
    effect(fn)
    p.set('key3', 'value3')
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('keys', () => {
    const p = reactive(
      new Map([
        ['key1', 'value1'],
        ['key2', 'value2'],
      ])
    )
    const fn = vi.fn(() => {
      for (const value of p.keys()) {
        value
      }
    })
    effect(fn)
    p.set('key2', 'value3')
    expect(fn).toHaveBeenCalledTimes(1)
    p.set('key3', 'value3')
    expect(fn).toHaveBeenCalledTimes(2)
  })
})
