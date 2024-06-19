import { describe, expect, it, vi } from 'vitest'
import { computed, effect, reactive, readonly, shallowReactive, watch } from '../src/main'

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
    obj.foo = 3
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

  it('5-3 拦截 in', () => {
    let obj = reactive({
      foo: 1,
    })
    let dummy
    let fn = vi.fn(() => {
      dummy = 'foo' in obj
    })
    effect(fn)
    expect(dummy).toBeTruthy()
    delete obj.foo
    expect(dummy).toBeFalsy()
  })

  it('5-3 拦截 for in', () => {
    let obj = reactive({
      foo: 1,
    })
    let dummy
    let fn = vi.fn(() => {
      for (const key in obj) {
        // todo
      }
    })
    effect(fn)
    expect(fn).toHaveBeenCalledTimes(1)
    obj.bar = 2
    expect(fn).toHaveBeenCalledTimes(2)
    obj.foo = 3
    expect(fn).toHaveBeenCalledTimes(2)
    delete obj.foo
    expect(fn).toHaveBeenCalledTimes(3)
  })

  it('5-4 当值没有发生变化时， 应该不需要触发响应才对：', () => {
    let obj = reactive({ foo: 1 })
    const fn = vi.fn(() => {
      obj.foo
    })
    effect(fn)
    obj.foo = 1
    expect(fn).toHaveBeenCalledOnce()
  })

  it('5-4 NaN：', () => {
    let obj = reactive({ foo: NaN })
    const fn = vi.fn(() => {
      obj.foo
    })
    effect(fn)
    obj.foo = NaN
    expect(fn).toHaveBeenCalledOnce()
  })

  it('5-4 屏蔽由原型引起的更新，从而避免不必要的更新操作', () => {
    const obj = {}
    const proto = { bar: 1 }
    const child = reactive(obj)
    const parent = reactive(proto)
    // 使用 parent 作为 child 的原型
    Object.setPrototypeOf(child, parent)

    const fn = vi.fn(() => {
      child.bar
    })
    effect(fn)
    // 修改 child.bar 的值
    child.bar = 2 // 会导致副作用函数重新执行两次
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('5-5 深响应', () => {
    const obj = reactive({ foo: { bar: 1 } })
    const fn = vi.fn(() => {
      console.log(obj.foo.bar)
    })
    effect(fn)
    // 修改 obj.foo.bar 的值，并不能触发响应
    obj.foo.bar = 2
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('5-5 浅响应', () => {
    const obj = shallowReactive({ foo: { bar: 1 } })
    const fn = vi.fn(() => {
      obj.foo.bar
    })
    effect(fn)
    // obj.foo 是响应的，可以触发副作用函数重新执行
    obj.foo = { bar: 2 }
    expect(fn).toHaveBeenCalledTimes(2)
    // obj.foo.bar 不是响应的，不能触发副作用函数重新执行
    obj.foo.bar = 3
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('5-6 只读', () => {
    const obj = readonly({ foo: 1 })
    const fn = vi.fn(() => {
      obj.foo // 可以读取值，但是不需要在副作用函数与数据之间建立响应联系
    })
    effect(fn)
    expect(fn).toHaveBeenCalledTimes(1)
    obj.foo = 2
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('5-7 代理数组', () => {
    const arr = reactive(['foo'])
    const fn = vi.fn(() => {
      arr[0] // 'foo'
    })
    effect(fn)

    arr[0] = 'bar' // 能够触发响应
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('5-7 ，如果设置的索引值大于数组当前的长度，那么要更新数组的 length 属性', () => {
    const arr = reactive(['foo'])
    const fn = vi.fn(() => {
      arr.length // 'foo'
    })
    effect(fn)

    arr[1] = 'bar' // 能够触发响应
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('5-7 ，修改数组的 length 属性也会隐式地影响 数组元素', () => {
    const arr = reactive(['foo'])
    const fn = vi.fn(() => {
      arr[0] // 'foo'
    })
    effect(fn)

    arr.length = 0 // 能够触发响应
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('5-7 ，数组 for in', () => {
    const arr = reactive(['foo'])
    const fn = vi.fn(() => {
      for (const key in arr) {
      }
    })
    effect(fn)

    arr.length = 0 // 能够触发响应
    expect(fn).toHaveBeenCalledTimes(2)
    arr[1] = 'bar'
    expect(fn).toHaveBeenCalledTimes(3)
  })

  it('5-7 ，数组 for of', () => {
    const arr = reactive([1, 2, 3, 4, 5])
    const fn = vi.fn(() => {
      for (const val of arr) {
        // val
      }
    })
    effect(fn)

    arr[1] = 'bar'
    expect(fn).toHaveBeenCalledTimes(2)
    arr.length = 0 // 能够触发响应
    expect(fn).toHaveBeenCalledTimes(3)
  })

  it('5-7 includes', () => {
    const arr = reactive([1, 2])
    const fn = vi.fn(() => {
      console.log(arr.includes(1)) // 初始打印 true
    })
    effect(fn)

    arr[0] = 3 // 副作用函数重新执行，并打印 false
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('5-7 includes 两个代理对象不同的问题', () => {
    const obj = {}
    const arr = reactive([obj])

    const dummy = arr.includes(arr[0])

    expect(dummy).toBeTruthy()
  })

  it('5-7 includes 和原始对象对比', () => {
    const obj = {}
    const arr = reactive([obj])

    const dummy = arr.includes(obj)

    expect(dummy).toBeTruthy()
  })

  it('5-7 隐式修改数组长度的原型方法', () => {
    const arr = reactive([])
    const fn1 = vi.fn(() => {
      // arr.push 方法不仅会间接读取 数组的 length 属性，还会间接设置 length 属性的值
      arr.push(1)
    })
    const fn2 = vi.fn(() => {
      arr.push(1)
    })
    effect(fn1)
    effect(fn2)
  })

  it.skip('5-8 Map Set', () => {
    const proxy = reactive(new Map([['key', 1]]))
    const fn = vi.fn(() => {
      proxy.get('key')
    })
    effect(fn)

    proxy.set('key', 2) // 修改键为 key 的值，应该触发响应

    expect(fn).toHaveBeenCalledTimes(2)
  })
})
