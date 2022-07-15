import { bubbleSort } from './bubble-sort'
import { selectionSort } from './selection-sort'
import { insertionSort } from './insertion-sort'
import { mergeSort } from './merge-sort'

function createNonSortedArray(size: number) {
  const array = []
  for (let i = size; i > 0; i--) {
    array.push(i)
  }
  return array
}
let array = createNonSortedArray(100) // {7}
console.time('1')
bubbleSort(array)
console.timeEnd('1')

console.time('2')
selectionSort(array)
console.timeEnd('2')

console.time('3')
insertionSort(array)
console.timeEnd('3')

console.time('4')
mergeSort(array)
console.timeEnd('4')
