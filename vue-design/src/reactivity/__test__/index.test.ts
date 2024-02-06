import { describe, it, expect, vi } from 'vitest'
import { reactive, effect, computed } from '..'

describe('1', () => {
  it('1-1', () => {
    const bucket = new Set()
    const data = { text: 'hello' }
    const obj = new Proxy(data, {
      get(target, key, receiver) {
        bucket.add(effect)
        return target[key]
      },
      set(target, key, newValue, receiver) {
        target[key] = newValue
        bucket.forEach((fn) => fn())
        return true
      },
    })
    let dummy
    function effect() {
      dummy = obj.text
    }
    effect()
    expect(dummy).toBe('hello')
    obj.text = 'world'
    expect(dummy).toBe('world')
  })

  it('1-2', () => {
    const obj = reactive({ text: 'hello' })
    let dummy
    effect(() => {
      dummy = obj.text
    })
    expect(dummy).toBe('hello')
    obj.text = 'world'
    expect(dummy).toBe('world')
  })

  it('在响应式数据 obj 上设置一个不存在的属性时', () => {
    const obj = reactive({ text: 'hello' })
    const fn = vi.fn(() => obj.text)
    effect(() => {
      fn()
    })
    expect(fn).toBeCalledTimes(1)
    obj.text = 'world'
    expect(fn).toBeCalledTimes(2)
    // 需要在副作用函数与被操作的字段之间建立联系
    obj.notExist = 'hello vue3'
    expect(fn).toBeCalledTimes(2)
  })

  it('分支切换与 cleanup', () => {
    const obj = reactive({ ok: true, text: 'hello world' })
    let dummy
    const fn = vi.fn(() => {
      dummy = obj.ok ? obj.text : 'not'
    })
    effect(fn)
    expect(dummy).toBe('hello world')
    // 这会触发更新，即副作用函数会重新执行。
    // 但由于此时 obj.ok的值为 false，所以不再会读取字段 obj.text 的值。
    obj.ok = false
    expect(dummy).toBe('not')
    expect(fn).toHaveBeenCalledTimes(2)
    // 最好的结果是，无论 obj.text 的值怎么变，都不需要重新执行副作用函数。
    // 方案 ?
    // 每次副作用函数执行时，我们可以先把它从所有与之关联的依赖集合中删除
    obj.text = 'hello vue3'
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it.skip('set', () => {
    // 无限循环
    const set = new Set([1])
    // set.forEach((item) => {
    //   set.delete(1)
    //   set.add(1)
    //   console.log('遍历中')
    // })
    // 解决方法： 构造另外一个 Set集合并遍历它
    const newSet = new Set(set)
  })

  it('effect 是可以发生嵌套', () => {
    const obj = reactive({ foo: true, bar: true })
    let temp1, temp2
    const effectFn2 = vi.fn(() => {
      console.log('effectFn2 执行')
      temp2 = obj.bar
    })
    const effectFn1 = vi.fn(() => {
      console.log('effectFn1 执行')

      effect(() => {
        effectFn2()
      })
      temp1 = obj.foo
    })

    effect(effectFn1)
    expect(temp1).toBe(true)
    expect(temp2).toBe(true)
    expect(effectFn1).toBeCalledTimes(1)
    expect(effectFn2).toBeCalledTimes(1)
    console.log('----')

    obj.foo = false
    expect(effectFn1).toBeCalledTimes(2)
    expect(effectFn2).toBeCalledTimes(2)
  })

  it('避免无限递归循环', () => {
    const obj = reactive({ foo: 1 })
    effect(() => obj.foo++)
    expect(obj.foo).toBe(2)
  })

  it('调度执行 scheduler 执行顺序', () => {
    vi.useFakeTimers()
    const obj = reactive({ foo: 1 })
    const dummy: any[] = []
    effect(
      () => {
        dummy.push(obj.foo)
      },
      {
        scheduler(fn) {
          setTimeout(() => fn.run())
        },
      }
    )
    obj.foo++
    dummy.push('结束了')
    vi.runAllTimers()
    expect(dummy).toEqual([1, '结束了', 2])
    vi.restoreAllMocks()
  })

  it.todo('调度执行 scheduler 执行次数', () => {
    const obj = reactive({ foo: 1 })
    const dummy: number[] = []
    // effect(() => {
    //   dummy.push(obj.foo)
    // })
    // expect(dummy).toEqual([1])
    // obj.foo++
    // obj.foo++
    // expect(dummy).toEqual([1, 2, 3])
    // 定义一个任务队列
    const jobQueue = new Set()
    // 使用 Promise.resolve() 创建一个 promise 实例，
    // 我们用它将一个任务添加到微任务队列
    const p = Promise.resolve()
    // 一个标志代表是否正在刷新队列
    let isFlushing = false
    function flushJob() {
      // 如果队列正在刷新，则什么都不做
      if (isFlushing) return
      // 设置为 true，代表正在刷新
      isFlushing = true
      p.then(() => {
        // 在微任务队列中刷新 jobQueue 队列
        jobQueue.forEach((job) => job.run())
      }).finally(() => {
        // 结束后重置 isFlushing
        isFlushing = false
      })
    }

    effect(
      () => {
        dummy.push(obj.foo)
      },
      {
        scheduler(fn) {
          // 每次调度时，将副作用函数添加到 jobQueue 队列中
          jobQueue.add(fn)
          // 调用 flushJob 刷新队列
          flushJob()
        },
      }
    )

    obj.foo++
    obj.foo++
    expect(dummy).toEqual([1, 3])
  })

  it('lazy effect', () => {
    const obj = reactive({ foo: 1 })
    const fn = vi.fn(() => {
      obj.foo
    })
    // 则不立即执行副作用函数：
    const effectFn = effect(fn, { lazy: true })
    expect(fn).toHaveBeenCalledTimes(0)
    effectFn()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('传递给 effect 的函数看作一个 getter', () => {
    const obj = reactive({ foo: 1, bar: 2 })
    const fn = vi.fn(() => {
      return obj.foo + obj.bar
    })
    const effectFn = effect(fn, { lazy: true })
    expect(fn).toHaveBeenCalledTimes(0)
    const value = effectFn()
    expect(fn).toHaveBeenCalledTimes(1)
    expect(value).toBe(3)
  })

  it('使用 computed 函数来创建一个计算属性', () => {
    const obj = reactive({ foo: 1, bar: 2 })
    const fn = vi.fn(() => obj.foo + obj.bar)
    const sumRes = computed(fn)
    expect(sumRes.value).toBe(3)
    expect(sumRes.value).toBe(3)
    expect(fn).toHaveBeenCalledTimes(1)

    obj.foo++
    expect(sumRes.value).toBe(4)
  })

  it('在另外一个 effect 中读取计算属性的值时', () => {
    const obj = reactive({ foo: 1, bar: 2 })
    const sumRes = computed(() => obj.foo + obj.bar)
    const fn = vi.fn(() => {
      sumRes.value
    })
    effect(fn)
    expect(fn).toBeCalledTimes(1)
    obj.foo++
    expect(fn).toBeCalledTimes(2)
  })
})
