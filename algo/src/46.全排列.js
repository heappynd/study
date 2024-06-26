/*
 * @lc app=leetcode.cn id=46 lang=javascript
 *
 * [46] 全排列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  let result = []
  let path = []
  let len = nums.length
  let used = new Array(len).fill(false)

  const backtrack = () => {
    if (path.length === len) {
      result.push([...path])
      return
    }

    for (let i = 0; i < len; i++) {
      if (used[i]) {
        continue
      }
      path.push(nums[i])
      used[i] = true
      backtrack()
      path.pop()
      used[i] = false
    }
  }

  backtrack(0)

  return result
}
// @lc code=end
