const sortArray = [1, 2, 3, 4, 5]

function binarySearch(array: number[], value: number) {
  let low = 0
  let high = array.length - 1

  while (low <= high) {
    const mid = Math.floor((low + high) / 2)
    const element = array[mid]
    if (element > value) {
      high = mid - 1
    } else if (element < value) {
      low = mid + 1
    } else {
      return mid
    }
  }

  return -1
}

console.log(binarySearch(sortArray, 5))
