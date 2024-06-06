/*
 * @lc app=leetcode.cn id=76 lang=javascript
 *
 * [76] 最小覆盖子串
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  const need = new Map()
  const window = new Map()
  for (let i = 0; i < t.length; i++) {
    if (need.has(t[i])) {
      need.set(t[i], need.get(t[i]) + 1)
    } else {
      need.set(t[i], 1)
    }
  }

  let left = 0,
    right = 0
  let valid = 0

  let start = 0,
    len = Infinity

  while (right < s.length) {
    // c 是将移入窗口的字符
    let c = s[right]
    right++
    // 进行窗口内数据的一系列更新
    if (need.has(c)) {
      if (window.has(c)) {
        window.set(c, window.get(c) + 1)
      } else {
        window.set(c, 1)
      }
      if (window.get(c) === need.get(c)) {
        valid++
      }
    }
    while (valid === need.size) {
      if (right - left < len) {
        start = left
        len = right - left
      }
      let d = s[left]
      left++
      if (need.has(d)) {
        if (window.get(d) === need.get(d)) {
          valid--
        }
        window.set(d, window.get(d) - 1)
      }
    }
  }
  return len === Infinity ? '' : s.substr(start, len)
}
// @lc code=end
