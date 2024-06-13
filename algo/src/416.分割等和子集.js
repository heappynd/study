/*
 * @lc app=leetcode.cn id=416 lang=javascript
 *
 * [416] 分割等和子集
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  const sum = nums.reduce((prev, curr) => prev + curr)

  if (sum % 2 !== 0) {
    return false
  }
  const target = sum / 2

  const dp = new Array(target + 1).fill(0)
  // dp[0] = 0

  for (let i = 0; i < nums.length; i++) {
    for (let j = target; j >= nums[i]; j--) {
      dp[j] = Math.max(dp[j], dp[j - nums[i]] + nums[i])
    }
  }

  return dp[target] === target
}
// @lc code=end
