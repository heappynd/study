import { expect, describe, it } from 'vitest'

export function testSortAlgorithm(sortAlgorithm: Function, algorithmName: string, config = { reverseCompare: true }) {
  describe(algorithmName, () => {
    const SIZE = 100

    function createNonSortedArray() {
      const array: number[] = []
      for (let i = SIZE; i > 0; i--) {
        array.push(i)
      }
      return array
    }

    function createSortedArray() {
      const array: number[] = []
      for (let i = 1; i <= SIZE; i++) {
        array.push(i)
      }
      return array
    }

    it('works with empty arrays', () => {
      expect(sortAlgorithm([])).to.deep.equal([])
    })

    it('works with sorted arrays', () => {
      let array = createSortedArray()
      const sortedArray = createSortedArray()
      array = sortAlgorithm(array)
      expect(array).to.deep.equal(sortedArray)
    })

    it('works with non-sorted arrays', () => {
      let array = createNonSortedArray()
      const sortedArray = createSortedArray()
      array = sortAlgorithm(array)

      expect(array).to.deep.equal(sortedArray)

      for (let i = 0; i < array.length - 1; i++) {
        expect(array[i] <= array[i + 1]).to.equal(true)
      }
    })
  })
}
