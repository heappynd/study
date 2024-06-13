/*
 * @lc app=leetcode.cn id=322 lang=javascript
 *
 * [322] 零钱兑换
 */

// @lc code=start
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  // 凑成总金额i所需的 最少的硬币个数
  const dp = new Array(amount + 1).fill(Infinity)
  const n = coins.length
  dp[0] = 0
  // dp[11] = Math.min(dp[11 - 1], dp[11 - 2], dp[11 - 5]) + 1

  for (let j = 1; j <= amount; j++) {
    for (let i = 0; i < n; i++) {
      dp[j] = Math.min(dp[j - coins[i]] + 1, dp[j])
    }
  }

  return dp[amount]
}
// @lc code=end
