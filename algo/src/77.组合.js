/*
 * @lc app=leetcode.cn id=77 lang=javascript
 *
 * [77] 组合
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  const ans = []
  const path = []

  function dfs(startIdx) {
    if (path.length === k) {
      ans.push([...path])
      return
    }
    for (let i = startIdx; i <= n - (k - path.length) + 1; i++) {
      path.push(i)
      dfs(i + 1)
      path.pop()
    }
  }

  dfs(1)
  return ans
}
// @lc code=end
