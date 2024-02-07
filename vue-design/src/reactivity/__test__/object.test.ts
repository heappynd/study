import { describe, it, vi, expect } from 'vitest'
import { reactive, readonly, shallowReactive, shallowReadonly } from '..'
import { effect } from '../effect'

describe('2', () => {
  it('why Reflect', () => {
    const obj = reactive({
      foo: 1,
      get bar() {
        return this.foo
      },
    })
    const fn = vi.fn(() => obj.bar)
    effect(fn)
    obj.foo++
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('test in', () => {
    const obj = reactive({ foo: 1 })
    const fn = vi.fn(() => {
      'foo' in obj
    })
    effect(fn)
    obj.foo++
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('test for in', () => {
    const obj = reactive({ foo: 1 })
    const fn = vi.fn(() => {
      for (const key in obj) {
      }
    })
    effect(fn)
    obj.bar = 2
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('与添加新属性不同，修改属性不会对 for...in 循环产生影响', () => {
    const obj = reactive({ foo: 1 })
    const fn = vi.fn(() => {
      for (const key in obj) {
      }
    })
    effect(fn)
    obj.foo = 2
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('test delete', () => {
    const obj = reactive({ foo: 1 })
    const fn = vi.fn(() => {
      obj.foo
    })
    effect(fn)
    delete obj.foo
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('test delete for in', () => {
    const obj = reactive({ foo: 1 })
    const fn = vi.fn(() => {
      for (let key in obj) {
      }
    })
    effect(fn)
    delete obj.foo
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('当值没有发生变化时，应该不需要触发响应', () => {
    const obj = reactive({ foo: 1 })
    const fn = vi.fn(() => obj.foo)
    effect(fn)
    obj.foo = 1
    expect(fn).toHaveBeenCalledOnce()
  })

  it('当值没有发生变化时，应该不需要触发响应 NaN', () => {
    const obj = reactive({ foo: NaN })
    const fn = vi.fn(() => obj.foo)
    effect(fn)
    obj.foo = NaN
    expect(fn).toHaveBeenCalledOnce()
  })

  it('从原型上继承属性的情况。', () => {
    const obj = {}
    const proto = { bar: 1 }
    const child = reactive(obj)
    const parent = reactive(proto)
    Object.setPrototypeOf(child, parent)
    const fn = vi.fn(() => child.bar)
    effect(fn)
    child.bar = 2
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('深响应', () => {
    const obj = reactive({ foo: { bar: 1 } })
    const fn = vi.fn(() => obj.foo.bar)
    effect(fn)
    obj.foo.bar = 2
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('浅响应', () => {
    const obj = shallowReactive({ foo: { bar: 1 } })
    const fn = vi.fn(() => obj.foo.bar)
    effect(fn)
    obj.foo.bar = 2
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('只读', () => {
    const obj = shallowReadonly({ foo: 1 })
    const fn = vi.fn(() => obj.foo)
    effect(fn)
    obj.foo++
    expect(obj.foo).toBe(1)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('深只读', () => {
    const obj = readonly({ foo: { bar: 2 } })
    const fn = vi.fn(() => obj.foo.bar)
    effect(fn)
    obj.foo.bar++
    expect(obj.foo.bar).toBe(2)
    expect(fn).toHaveBeenCalledTimes(1)
  })
})

describe('arr', () => {
  it('arr', () => {
    const arr = reactive(['foo'])
    const fn = vi.fn(() => arr[0])
    effect(fn)
    arr[0] = 'bar'
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('set 会影响 length', () => {
    const arr = reactive(['foo'])
    const fn = vi.fn(() => arr.length)
    effect(fn)
    arr[1] = 'bar'
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('设置 length 也会影响到数组获取', () => {
    const arr = reactive(['foo'])
    const fn = vi.fn(() => arr[0])
    effect(fn)
    arr.length = 0
    expect(fn).toHaveBeenCalledTimes(2)
  })
})
