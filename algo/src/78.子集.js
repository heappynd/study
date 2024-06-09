/*
 * @lc app=leetcode.cn id=78 lang=javascript
 *
 * [78] 子集
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  let ans = []
  let path = []
  let n = nums.length
  function dfs(i) {
    if (i === n) {
      ans.push([...path])
      return
    }
    // 不选
    dfs(i + 1)
    // 选
    path.push(nums[i])
    dfs(i + 1)
    path.pop()
  }

  dfs(0)

  return ans
}
// @lc code=end
