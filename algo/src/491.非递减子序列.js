/*
 * @lc app=leetcode.cn id=491 lang=javascript
 *
 * [491] 非递减子序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var findSubsequences = function (nums) {
  const result = []
  const len = nums.length
  const path = []

  const dfs = (start) => {
    if (path.length > 1) {
      result.push([...path])
    }

    const used = new Set()

    for (let i = start; i < len; i++) {
      if (used.has(nums[i])) {
        continue
      }
      if (path.length > 0 && nums[i] < path[path.length - 1]) {
        continue
      }
      path.push(nums[i])
      used.add(nums[i])
      dfs(i + 1)
      path.pop()
    }
  }

  dfs(0)

  return result
}
// @lc code=end
