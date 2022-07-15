import { Compare, defaultCompare, swap } from '../utils'

export function bubbleSort<T>(array: T[], compareFn = defaultCompare) {
  const { length } = array

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - 1; j++) {
      if (compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
        swap(array, j, j + 1)
      }
    }
  }

  return array
}
