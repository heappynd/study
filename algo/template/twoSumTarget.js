function twoSumTarget(nums, target) {
  nums.sort((a, b) => a - b)
  let res = []
  let lo = 0,
    hi = nums.length - 1
  while (lo < hi) {
    let sum = nums[lo] + nums[hi]
    let leftVal = nums[lo]
    let rightVal = nums[hi]
    // 根据 sum 和 target 的比较，移动左右指针
    // Move left and right pointers based on the comparison between sum and target
    if (sum < target) {
      while (lo < hi && nums[lo] === leftVal) {
        lo++
      }
    } else if (sum > target) {
      while (lo < hi && nums[hi] === rightVal) {
        hi--
      }
    } else {
      res.push([leftVal, rightVal])
      while (lo < hi && nums[lo] === leftVal) {
        lo++
      }
      while (lo < hi && nums[hi] === rightVal) {
        hi--
      }
    }
  }
  return res
}

console.log(twoSumTarget([1, 1, 1, 2, 2, 3, 3], 5))
