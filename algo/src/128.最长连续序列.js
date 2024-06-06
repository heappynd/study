/*
 * @lc app=leetcode.cn id=128 lang=javascript
 *
 * [128] 最长连续序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  if (nums.length === 0) return 0
  const set = new Set(nums)

  let longestStreak = 0

  for (const num of set) {
    if (!set.has(num + 1)) {
      // 是末尾的
      let currentNum = num
      let currentStreak = 1
      while (set.has(currentNum - 1)) {
        currentNum--
        currentStreak++
      }
      longestStreak = Math.max(currentStreak, longestStreak)
    }
  }

  return longestStreak
}
// -1 0 1
//
