function binarySearch(arr: number[], searchValue: number) {
  let low = 0
  let high = arr.length - 1

  while (low <= high) {
    const mid = Math.floor((high + low) / 2)
    const element = arr[mid]
    if (element < searchValue) {
      low = mid + 1
    } else if (element > searchValue) {
      high = mid - 1
    } else {
      return mid
    }
  }
  return -1
}

console.log(binarySearch([1, 2, 3, 4, 5], 55))
