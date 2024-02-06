import { describe, it, vi, expect } from 'vitest'
import { reactive } from '..'
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
})
