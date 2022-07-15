import { Compare, defaultCompare, swap } from '../utils'
import { insertionSort } from './insertion-sort'

export const selectionSort = (array: any[], compareFn = defaultCompare) => {
  const { length } = array
  let indexMin

  for (let i = 0; i < length; i++) {
    indexMin = i
    for (let j = i; j < length; j++) {
      if (compareFn(array[indexMin], array[j]) === Compare.BIGGER_THAN) {
        indexMin = j
      }
      if (i !== indexMin) {
        swap(array, i, indexMin)
      }
    }
  }
  return array
}
