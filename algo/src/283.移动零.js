/*
 * @lc app=leetcode.cn id=283 lang=javascript
 *
 * [283] 移动零
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  const len = nums.length
  let slow = 0,
    fast = 0

  while (fast < len) {
    if (nums[fast] !== 0) {
      ;[nums[slow], nums[fast]] = [nums[fast], nums[slow]]
      slow++
    }
    fast++
  }
}
// @lc code=end
