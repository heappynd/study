/*
 * @lc app=leetcode.cn id=213 lang=javascript
 *
 * [213] 打家劫舍 II
 */

const { max } = require('lodash-es')

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  function robRange(start, end) {
    const dp = []
    dp[start] = nums[start]
    dp[start + 1] = Math.max(nums[start], nums[start + 1])
    for (let i = start + 2; i <= end; i++) {
      dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i])
    }
    return dp[end]
  }
  const n = nums.length

  if (n === 0) {
    return 0
  }
  if (n === 1) {
    return nums[0]
  }

  const result1 = robRange(0, n - 2)
  const result2 = robRange(1, n - 1)

  return Math.max(result1, result2)
}
// @lc code=end
