import { swap } from '../utils'

export function bubble(arr: number[]) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      console.log(arr[j], arr[j + 1])
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1)
      }
    }
    console.log('----')
  }
  console.log(arr)
}

bubble([5, 4, 3, 2, 1])
