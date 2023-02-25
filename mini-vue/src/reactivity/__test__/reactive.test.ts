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
})
