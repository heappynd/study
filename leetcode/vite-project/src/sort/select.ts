import { swap } from '../utils'

function select(arr: number[]) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[minIdx] > arr[j]) {
        minIdx = j
      }
    }

    if (minIdx !== i) {
      swap(arr, i, minIdx)
    }
  }
  console.log(arr)
}

select([3, 1, 2])
