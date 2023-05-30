import { swap } from ".";

export function bubbleSort1(array: number[]) {
  const n = array.length;
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < n - i; j++) {
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1);
      }
    }
  }
}

export function bubbleSort2(array: number[]) {
  const n = array.length;
  for (let i = 0; i < n; i++) {
    let hasSort = true;
    for (let j = 0; j < n - i; j++) {
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1);
        hasSort = false;
      }
    }
    if (hasSort) {
      break;
    }
  }
}
