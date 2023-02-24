import { describe, expect, it, vi } from 'vitest'
import { effect, reactive } from '../src'

describe('reactive/test', () => {
  it('Reflect vs target', () => {
    const obj = {
      foo: 1,
      get bar() {
        console.log(this)

        return this.foo
      },
    }
    const fn = vi.fn(() => {
      console.log(p.bar)
    })
    const p = reactive(obj)
    effect(fn)
    expect(fn).toHaveBeenCalledTimes(1)
    p.foo = 100
    expect(fn).toHaveBeenCalledTimes(2)
  })
})
