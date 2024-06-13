/*
 * @lc app=leetcode.cn id=494 lang=javascript
 *
 * [494] 目标和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function (nums, target) {
  let sum = nums.reduce((p, c) => p + c)
  // 这两种情况，不可能存在合法的子集划分
  if (sum < Math.abs(target) || (sum + target) % 2 === 1) {
    return 0
  }
  // 有一个背包，容量为 sum，
  // 现在给你 N 个物品，
  // 第 i 个物品的重量为 nums[i - 1]（注意 1 <= i <= N），
  // 每个物品只有一个，请问你有几种不同的方法能够恰好装满这个背包？
  const s = (sum + target) / 2

  // dp[i][j] = x 表示，若只在前 i 个物品中选择，若当前背包的容量为 j，则最多有 x 种方法可以恰好装满背包。
  const n = nums.length
  const dp = new Array(n + 1).fill().map(() => new Array(s + 1).fill(0))

  dp[0][0] = 1

  for (let i = 1; i <= n; i++) {
    for (let j = 0; j <= s; j++) {
      if (j >= nums[i - 1]) {
        dp[i][j] = dp[i - 1][j] + dp[i - 1][j - nums[i - 1]]
      } else {
        // 背包的空间不足，只能选择不装物品 i
        dp[i][j] = dp[i - 1][j]
      }
    }
  }

  return dp[n][s]
}
// @lc code=end
