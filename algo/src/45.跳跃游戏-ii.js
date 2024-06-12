/*
 * @lc app=leetcode.cn id=45 lang=javascript
 *
 * [45] 跳跃游戏 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
  if (nums.length === 1) {
    return 0
  }
  // 当前覆盖范围
  let cur = 0
  // 下一步覆盖范围
  let next = 0
  let result = 0

  for (let i = 0; i < nums.length; i++) {
    next = Math.max(next, i + nums[i])
    // i 走到当前覆盖范围的终点
    if (i === cur) {
      // 不是数组的终点
      if (cur !== nums.length - 1) {
        cur = next
        result++
        if (cur >= nums.length - 1) {
          // 当前范围已经能够覆盖到了末尾
          break
        }
      } else {
        break
      }
    }
  }

  return result
}
// @lc code=end
