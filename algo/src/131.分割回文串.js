/*
 * @lc app=leetcode.cn id=131 lang=javascript
 *
 * [131] 分割回文串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
  function isPalindrome(sub) {
    let left = 0
    let right = sub.length - 1
    while (left < right) {
      if (sub[left] !== sub[right]) {
        return false
      }
      left++
      right--
    }
    return true
  }

  const ans = []
  const path = []

  function backtrack(start) {
    if (start === s.length) {
      ans.push([...path])
      return
    }
    for (let end = start + 1; end <= s.length; end++) {
      const currentSub = s.substring(start, end)

      if (isPalindrome(currentSub)) {
        path.push(currentSub)
        backtrack(end)
        path.pop()
      }
    }
  }

  backtrack(0)
  return ans
}
// @lc code=end
