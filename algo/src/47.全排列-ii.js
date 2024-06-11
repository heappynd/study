/*
 * @lc app=leetcode.cn id=47 lang=javascript
 *
 * [47] 全排列 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
  let result = []
  let path = []
  let len = nums.length
  let used = new Array(len).fill(false)

  function backtrack() {
    if (path.length === len) {
      result.push([...path])
      return
    }
    const set = new Set()
    for (let i = 0; i < len; i++) {
      if (used[i]) {
        continue
      }
      if (set.has(nums[i])) {
        continue
      }
      used[i] = true
      set.add(nums[i])
      path.push(nums[i])
      backtrack()
      path.pop()
      used[i] = false
    }
  }

  backtrack()

  return result
}
// @lc code=end
