/*
 * @lc app=leetcode.cn id=49 lang=javascript
 *
 * [49] 字母异位词分组
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const map = new Map()
  for (let i = 0; i < strs.length; i++) {
    let sortStr = strs[i].split('').sort().join('')

    if (!map.has(sortStr)) {
      map.set(sortStr, [strs[i]])
    } else {
      const origin = map.get(sortStr)
      map.set(sortStr, [strs[i], ...origin])
    }
  }
  let res = []
  for (const value of map.values()) {
    res.push(value)
  }
  return res
}
// @lc code=end
