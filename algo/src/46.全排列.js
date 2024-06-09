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
  const ans = []
  const path = []

  const n = nums.length

  const used = []

  function dfs(i) {
    if (i === n) {
      ans.push([...path])
      return
    }
    for (let i = 0; i < n; i++) {
      if (path.includes(nums[i])) {
        break
      }
      path.push(nums[i],)
      dfs(i + 1)
    }
  }

  dfs(0)
  console.log('ans', ans)
}
// @lc code=end
