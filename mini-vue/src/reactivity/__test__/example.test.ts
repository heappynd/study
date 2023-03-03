import { describe, expect, it } from 'vitest'

describe('other', () => {
  it('iterator', () => {
    const obj = {
      val: 0,
      [Symbol.iterator]() {
        return {
          next() {
            return {
              value: obj.val++,
              done: obj.val > 3,
            }
          },
        }
      },
    }
    let dummy: number[] = []
    for (const item of obj) {
      dummy.push(item)
    }
    expect(dummy).toEqual([0, 1, 2])
  })
})
