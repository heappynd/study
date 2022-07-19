function swap(array: number[], a: number, b: number) {
  ;[array[a], array[b]] = [array[b], array[a]]
}

function median3(array: number[], left: number, right: number) {
  const center = Math.floor((left + right) / 2)

  if (array[left] > array[center]) {
    swap(array, left, center)
  }
  if (array[left] > array[right]) {
    swap(array, center, right)
  }

  if (array[center] > array[right]) {
    swap(array, center, right)
  }

  swap(array, center, right - 1)
  // left + 1 --- right - 2
  return array[right - 1]
}

function quick(array: number[], left: number, right: number) {
  const pivot = median3(array, left, right)
  let i = left
  let j = right - 1
  for (;;) {
    while (array[++i] < pivot) {}
    while (array[--j] > pivot) {}
    if (i < j) {
      swap(array, i, j)
    } else {
      break
    }
  }
  swap(array, i, right - 1)
  quick(array, left, i - 1)
  quick(array, i + 1, right)
}

export function quickSort(array: number[]) {
  quick(array, 0, array.length - 1)
}
