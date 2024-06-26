var change = function (amount, coins) {
  // 可以凑成总金额j的硬币组合数
  const dp = new Array(amount + 1).fill(0)
  dp[0] = 1

  for (let i = 0; i < coins.length; i++) {
    for (let j = coins[i]; j <= amount; j++) {
      dp[j] += dp[j - coins[i]]
    }
  }

  return dp[amount]
}

console.log(change(5, [1, 2, 5]))
