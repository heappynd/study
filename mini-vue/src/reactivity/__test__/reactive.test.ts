import { describe, expect, it, vi } from 'vitest'
import {
  effect,
  reactive,
  shallowReactive,
  readonly,
  shallowReadonly,
} from '../src'

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

  it('深响应', () => {
    let dummy
    const obj = reactive({
      foo: { bar: 1 },
    })
    const fn = vi.fn(() => {
      dummy = obj.foo.bar
    })
    effect(fn)
    expect(dummy).toBe(1)
    obj.foo.bar = 2
    expect(dummy).toBe(2)
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('浅响应 shallowReactive', () => {
    let dummy
    const obj = shallowReactive({
      foo: { bar: 1 },
    })
    const fn = vi.fn(() => {
      dummy = obj.foo.bar
    })
    effect(fn)
    expect(dummy).toBe(1)
    obj.foo.bar = 2
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('readonly test', () => {
    let dummy
    const obj = shallowReadonly({
      foo: 1,
    })
    const fn = vi.fn(() => {
      dummy = obj.foo
    })
    effect(fn)
    obj.foo = 2
    expect(dummy).toBe(1)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('deep readonly test', () => {
    let dummy
    const obj = readonly({
      foo: { bar: 1 },
    })
    const fn = vi.fn(() => {
      dummy = obj.foo.bar
    })
    effect(fn)
    obj.foo.bar = 2
    expect(dummy).toBe(1)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('set array element', () => {
    const arr = reactive(['foo'])
    const fn1 = vi.fn(() => {
      console.log(arr[0])
    })
    const fn2 = vi.fn(() => {
      console.log(arr.length)
    })
    effect(fn1)
    effect(fn2)
    arr[1] = 'bar'
    expect(fn1).toHaveBeenCalledTimes(1)
    expect(fn2).toHaveBeenCalledTimes(2)
  })

  it('modify array length', () => {
    const arr = reactive(['foo'])
    const fn = vi.fn(() => {
      console.log(arr[0])
    })
    effect(fn)
    arr.length = 0
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('modify array length part two', () => {
    const arr = reactive(['foo'])
    const fn = vi.fn(() => {
      console.log(arr[0])
    })
    effect(fn)
    arr.length = 100
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('for in array', () => {
    const arr = reactive(['foo'])
    const fn = vi.fn(() => {
      for (const key in arr) {
      }
    })
    effect(fn)
    arr[1] = 'bar'
    expect(fn).toHaveBeenCalledTimes(2)
    arr.length = 0
    expect(fn).toHaveBeenCalledTimes(3)
  })
})
