/*
 * @lc app=leetcode.cn id=455 lang=javascript
 *
 * [455] 分发饼干
 */

// @lc code=start
/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function (g, s) {
  // 对孩子的胃口值数组和饼干尺寸数组进行排序
  g.sort((a, b) => a - b)
  s.sort((a, b) => a - b)

  let index = s.length - 1
  let count = 0
  // 这里的局部最优就是大饼干喂给胃口大的，充分利用饼干尺寸喂饱一个，全局最优就是喂饱尽可能多的小孩。
  for (let i = g.length - 1; i >= 0; i--) {
    if (index >= 0 && s[index] >= g[i]) {
      count++
      index--
    }
  }

  return count // 返回满足的孩子数量
}
// @lc code=end
