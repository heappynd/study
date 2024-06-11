/*
 * @lc app=leetcode.cn id=53 lang=javascript
 *
 * [53] 最大子数组和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let sum = 0
  let result = -Infinity

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i]
    if (sum > result) {
      result = sum
    }
    if (sum < 0) {
      // 如果小于0，就以下一个number[i] 作为新的起点，重新开始计算
      sum = 0
    }
  }

  return result
}
// @lc code=end
