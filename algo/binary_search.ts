const nums = [1, 3, 6, 8, 12, 15, 23, 26, 31, 35]

function binarySearch(nums: number[], target: number) {
  let i = 0
  let j = nums.length - 1

  while (i <= j) {
    const m = Math.floor((i + j) / 2)
    if (nums[m] > target) {
      j = m - 1
    } else if (nums[m] < target) {
      i = m + 1
    } else {
      return m
    }
  }
  return -1
}

console.log(binarySearch(nums, 12));

