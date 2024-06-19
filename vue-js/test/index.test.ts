import { describe, expect, it, vi } from 'vitest'
import { computed, effect, reactive, watch } from '../src/main'

describe('4', () => {
  it('4', () => {
    const proxyObj = reactive({ text: 'hello world' })
    let dummy
    effect(() => {
      dummy = proxyObj.text
    })

    proxyObj.text = 'hello vue'

    expect(dummy).toBe('hello vue')
  })

  it('4-4', () => {
    const proxyObj = reactive({ ok: true, text: 'hello world' })
    let dummy

    let fn = vi.fn(() => {
      dummy = proxyObj.ok ? proxyObj.text : 'not'
    })

    effect(fn)

    expect(dummy).toBe('hello world')

    proxyObj.ok = false
    expect(dummy).toBe('not')
    proxyObj.text = 'hello vue'
    expect(dummy).toBe('not')
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('4-5', () => {
    let obj = reactive({ foo: true, bar: true })

    let temp1, temp2

    let fn2 = vi.fn(() => {
      temp2 = obj.bar
    })
    let fn1 = vi.fn(() => {
      effect(fn2)
      temp1 = obj.foo
    })

    effect(fn1)

    expect(fn1).toHaveBeenCalledOnce()
    expect(fn2).toHaveBeenCalledOnce()

    obj.foo = false

    expect(fn1).toHaveBeenCalledTimes(2)
    expect(fn2).toHaveBeenCalledTimes(2)

    // obj.bar = false
    // expect(fn1).toHaveBeenCalledTimes(2)
    // expect(fn2).toHaveBeenCalledTimes(3)
  })

  it('4-6', () => {
    let obj = reactive({ foo: 1 })

    const fn = vi.fn(() => {
      obj.foo++
    })

    effect(fn)

    expect(fn).toHaveBeenCalledOnce()
  })

  it('4-7', () => {
    let obj = reactive({ foo: 1 })
    let dummy

    const fn = vi.fn(() => {
      dummy = obj.foo
    })

    effect(fn, {
      scheduler(fn) {},
    })

    expect(fn).toHaveBeenCalledTimes(1)

    obj.foo = 2
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('4-8 lazy', () => {
    let obj = reactive({ foo: 1 })
    let dummy

    const fn = vi.fn(() => {
      dummy = obj.foo
    })

    const effectFn = effect(fn, {
      lazy: true,
    })

    expect(fn).toHaveBeenCalledTimes(0)
    obj.foo = 2
    expect(fn).toHaveBeenCalledTimes(0)

    effectFn()
    expect(fn).toHaveBeenCalledTimes(1)
    obj.foo = 2
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('4-8 result', () => {
    let obj = reactive({ foo: 1 })

    const fn = vi.fn(() => obj.foo * 2)

    const effectFn = effect(fn, {
      lazy: true,
    })

    const value = effectFn()
    expect(value).toBe(2)
  })

  it('4-8 computed', () => {
    let obj = reactive({ foo: 100 })

    const double = computed(() => obj.foo * 2)

    expect(double.value).toBe(200)
    expect(double.value).toBe(200)
    obj.foo = 200
    expect(double.value).toBe(400)
  })

  it('4-8 computed 2', () => {
    let obj = reactive({ foo: 100 })
    let dummy
    const double = computed(() => obj.foo * 2)

    effect(() => {
      dummy = double.value
    })

    expect(dummy).toBe(200)
    obj.foo = 200
    expect(dummy).toBe(400)
  })

  it('4-8 watch', () => {
    let obj = reactive({ foo: 1 })
    let dummy1, dummy2
    const fn = vi.fn((newValue, oldValue) => {
      dummy1 = newValue
      dummy2 = oldValue
    })

    watch(() => obj.foo, fn)
    obj.foo++
    expect(dummy1).toBe(2)
    expect(dummy2).toBe(1)
  })

  it('4-8 watch immediate', () => {
    let obj = reactive({ foo: 1 })
    let dummy1, dummy2
    const fn = vi.fn((newValue, oldValue) => {
      dummy1 = newValue
      dummy2 = oldValue
    })

    watch(() => obj.foo, fn, { immediate: true })
    expect(dummy1).toBe(1)
    expect(dummy2).toBe(undefined)
  })

  it('5-1', () => {
    let obj = reactive({
      foo: 1,
      get bar() {
        return this.foo
      },
    })
    let dummy
    const fn = vi.fn(() => {
      dummy = obj.bar
    })
    effect(fn)
    expect(dummy).toBe(1)
    expect(fn).toHaveBeenCalledTimes(1)
    obj.foo = 2
    expect(dummy).toBe(2)
    expect(fn).toHaveBeenCalledTimes(2)
  })
})
