/*
 * @lc app=leetcode.cn id=300 lang=javascript
 *
 * [300] 最长递增子序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  const dp = new Array(nums.length).fill(1)
  // dp[0] = 1
  // dp[i] 表示以 nums[i] 这个数结尾的最长递增子序列的长度。
  for (let i = 1; i < nums.length; i++) {
    let record = []
    for (let j = 0; j < i; j++) {
      // 取比i值小的dp
      if (nums[j] < nums[i]) {
        record.push(dp[j])
      }
    }
    if (record.length) {
      dp[i] = Math.max(...record) + 1
    }
  }

  return Math.max(...dp)
}
// @lc code=end
