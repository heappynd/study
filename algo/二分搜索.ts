function binarySearch(nums: number[], target: number) {
  let left = 0,
    right = nums.length - 1

  while (left <= right) {
    let mid = Math.floor((left + right) / 2)
    if (mid === target) {
      return mid
    } else if (mid > target) {
      right = mid - 1
    } else if (mid < target) {
      left = mid + 1
    }
  }

  return -1
}

console.log(binarySearch([0, 1, 2, 3, 4, 5, 6], 3))
