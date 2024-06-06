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
  function removeElement(nums, val) {
    let slow = 0
    let fast = 0
    while (fast < nums.length) {
      if (nums[fast] !== val) {
        nums[slow] = nums[fast]
        slow++
      }
      fast++
    }
    return slow
  }

  let p = removeElement(nums, 0)
  while (p < nums.length) {
    nums[p] = 0
    p++
  }
}
// @lc code=end
