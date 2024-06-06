/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  let res = ''
  for (let i = 0; i < s.length; i++) {
    const s1 = palindrome(s, i, i)
    const s2 = palindrome(s, i, i + 1)
    res = res.length > s1.length ? res : s1
    res = res.length > s2.length ? res : s2
  }
  return res

  // 在 s 中寻找以 s[l] 和 s[r] 为中心的最长回文串
  function palindrome(s, l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      l--
      r++
    }
    return s.substring(1 + l, r)
  }
}
// @lc code=end
