/*
 * @lc app=leetcode.cn id=55 lang=javascript
 *
 * [55] 跳跃游戏
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  // 覆盖的下标位置
  let cover = 0
  if (nums.length === 1) {
    return true
  }
  for (let i = 0; i <= cover; i++) {
    // 取最大的覆盖范围
    cover = Math.max(cover, i + nums[i])
    if (cover >= nums.length - 1) {
      return true
    }
  }
  return false
}
// @lc code=end
