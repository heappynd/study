import { describe, it, expect } from 'vitest'
import { MyList } from '../my_list'

describe('index', () => {
  it('1', () => {
    const list = new MyList()

    expect(list.size()).toBe(0)
    expect(list.capacity()).toBe(10)
    expect(list.toArray()).toEqual([])

    for (let i = 0; i < 11; i++) {
      list.add(i)
    }

    expect(list.size()).toBe(11)
    expect(list.capacity()).toBe(20)
    expect(list.toArray()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

    list.insert(1, -100)
    expect(list.toArray()).toEqual([0, -100, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    expect(list.get(2)).toBe(1)

    list.set(2, -888)
    expect(list.get(2)).toBe(-888)

    list.remove(1)
    list.remove(1)
    expect(list.toArray()).toEqual([0, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  })
})
