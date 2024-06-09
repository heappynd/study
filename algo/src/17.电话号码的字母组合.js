/*
 * @lc app=leetcode.cn id=17 lang=javascript
 *
 * [17] 电话号码的字母组合
 */

// @lc code=start
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  const MAPPING = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']
  const n = digits.length
  if (n === 0) {
    return []
  }
  const ans = []
  const path = new Array(n).fill('') // Initialize path with empty strings

  const dfs = (i) => {
    if (i === n) {
      ans.push(path.join(''))
      return
    }
    const curr = MAPPING[digits[i]]
    for (const c of curr) {
      path[i] = c
      dfs(i + 1)
    }
  }

  dfs(0)
  return ans
}
// @lc code=end
