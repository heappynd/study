import { describe, expect, it, vi } from 'vitest'
import { effect, reactive } from '../src'

describe('reactive/test', () => {
  it('Reflect vs target', () => {
    const obj = {
      foo: 1,
      get bar() {
        return this.foo
      },
    }
    const fn = vi.fn(() => {
      p.bar
    })
    const p = reactive(obj)
    effect(fn)
    expect(fn).toHaveBeenCalledTimes(1)
    p.foo = 100
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('foo in obj', () => {
    const obj = reactive({
      name: 'andy',
    })
    const fn = vi.fn((arg) => {})
    effect(() => {
      fn('name' in obj)
    })
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith(true)
    // delete obj.name
    // expect(fn).toHaveBeenCalledTimes(2)
    // expect(fn).toHaveBeenCalledWith(false)
  })

  it('for in', () => {
    const obj = reactive({
      name: 'andy',
    })
    const fn = vi.fn(() => {
      for (const key in obj) {
      }
    })
    effect(fn)
    expect(fn).toHaveBeenCalledTimes(1)
    obj.age = 20
    expect(fn).toHaveBeenCalledTimes(2)
    obj.name = 'leo'
    expect(fn).toHaveBeenCalledTimes(2)
    delete obj.name
    expect(fn).toHaveBeenCalledTimes(3)
  })

  it('数据不变不触发更新', () => {
    let dummy
    const obj = reactive({
      age: 1,
    })
    const fn = vi.fn(() => {
      dummy = obj.age
    })
    effect(fn)
    obj.age = 1
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('NaN', () => {
    let dummy
    const obj = reactive({
      foo: NaN,
    })
    const fn = vi.fn(() => {
      dummy = obj.foo
    })
    effect(fn)
    obj.foo = NaN
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('reactive inherited', () => {
    let dummy
    const child = reactive({})
    const parent = reactive({ bar: 1 })
    Object.setPrototypeOf(child, parent)
    const fn = vi.fn(() => {
      dummy = child.bar
    })
    effect(fn)
    expect(dummy).toBe(1)
    child.bar = 2
    expect(fn).toHaveBeenCalledTimes(2)
  })
})
