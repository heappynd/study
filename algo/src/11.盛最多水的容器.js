/*
 * @lc app=leetcode.cn id=11 lang=javascript
 *
 * [11] 盛最多水的容器
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let ans = 0
  let left = 0
  let right = height.length - 1
  // [left, right)
  while (left < right) {
    // 下标的差是宽度
    // 两个高度的最小值
    area = (right - left) * Math.min(height[left], height[right])
    ans = Math.max(ans, area)
    // 如果左边矮, 就把左边去掉   
    if (height[left] < height[right]) {
      left++
    } else {
      right--
    }
  }

  return ans
}
// @lc code=end
