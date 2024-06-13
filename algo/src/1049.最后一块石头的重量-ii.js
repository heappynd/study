/*
 * @lc app=leetcode.cn id=1049 lang=javascript
 *
 * [1049] 最后一块石头的重量 II
 */

// @lc code=start
/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeightII = function (stones) {
  // 把石头尽可能分成重量相同的两堆 让他们相撞
  const sum = stones.reduce((p, c) => p + c)
  const target = Math.floor(sum / 2)

  const itemSize = stones.length
  const dp = new Array(target + 1).fill(0)

  for (let i = 0; i < itemSize; i++) {
    for (let j = target; j >= stones[i]; j--) {
      dp[j] = Math.max(dp[j], dp[j - stones[i]] + stones[i])
    }
  }

  return sum - dp[target] - dp[target]
}
// @lc code=end
