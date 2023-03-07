import { describe, expect, it, vi } from 'vitest'
import { effect, reactive, ref } from '../src'

describe('basic type', () => {
  it('wrapper', () => {
    const wrapper = {
      value: 'vue',
    }
    const name = reactive(wrapper)
    const fn = vi.fn(() => {
      name.value
    })
    effect(fn)
    expect(name.value).toBe('vue')
    name.value = 'vue3'
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('refVal', () => {
    const refVal = ref(1)
    const fn = vi.fn(() => {
      refVal.value
    })
    effect(fn)
    expect(refVal.value).toBe(1)
  })

  it('lose reaction', () => {
    const obj = reactive({ foo: 1, bar: 2 })
    const newObj = {
      ...obj,
    }
    const fn = vi.fn(() => {
      newObj.foo = 2
    })
    effect(fn)
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
