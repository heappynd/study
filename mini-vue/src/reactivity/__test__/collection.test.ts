import { describe, it, expect, vi } from 'vitest'
import { reactive } from '../src/collection'
import { effect } from '../src'

describe('collection', () => {
  it('map and set', () => {
    const s = new Set([1, 2, 3])
    const p = reactive(s)
    p.size
    // p.delete(1)
  })

  it('map and set proxy', () => {
    let dummy
    const p = reactive(new Set([1, 2, 3]))
    const fn = vi.fn(() => {
      dummy = p.size
    })
    effect(fn)
    p.add(1)
    expect(fn).toHaveBeenCalledTimes(2)
  })
})
