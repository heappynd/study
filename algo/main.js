var largestSumAfterKNegations = function (nums, k) {
  // 按绝对值排序
  nums.sort((a, b) => Math.abs(b) - Math.abs(a))

  console.log(nums)

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < 0 && k > 0) {
      // 把负数取反 负数里面优先选绝对值最大的取反
      nums[i] = -nums[i]
      k--
    }
  }

  // 都是正数了 最小值取反 已经排序了，所以最后一个是最小的
  // 奇数取反才有意义 偶数没意义
  if (k % 2 === 1) {
    nums[nums.length - 1] = -nums[nums.length - 1]
  }

  return nums.reduce((sum, curr) => sum + curr)
}

console.log(largestSumAfterKNegations([2, -3, -1, 5, -4], 2))
