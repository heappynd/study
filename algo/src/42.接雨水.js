/*
 * @lc app=leetcode.cn id=42 lang=javascript
 *
 * [42] 接雨水
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  const n = height.length
  // 前缀最大值
  const preMax = new Array(n)
  preMax[0] = height[0]
  for (let i = 1; i < n; i++) {
    // 那每个前缀最大值呢都等于它上一个前缀最大值和当前高度 取Max
    preMax[i] = Math.max(preMax[i - 1], height[i])
  }
  const sufMax = new Array(n)
  sufMax[n - 1] = height[n - 1]
  for (let i = n - 2; i >= 0; i--) {
    sufMax[i] = Math.max(sufMax[i + 1], height[i])
  }

  let ans = 0
  for (let i = 0; i < n; i++) {
    ans += Math.min(preMax[i], sufMax[i]) - height[i]
  }
  return ans
}
// @lc code=end
