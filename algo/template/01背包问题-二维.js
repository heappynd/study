/**
 *
 * @param {number[]} weight
 * @param {number[]} value
 * @param {number} bagSize
 */
function bag(weight, value, bagSize) {
  const itemSize = weight.length
  let dp = new Array(itemSize).fill().map(() => new Array(bagSize + 1).fill(0))

  // 初始化第0行
  for (let i = weight[0]; i <= bagSize; i++) {
    dp[0][i] = value[0]
  }

  for (let i = 1; i < itemSize; i++) {
    for (let j = 0; j <= bagSize; j++) {
      if (j < weight[i]) {
        dp[i][j] = dp[i - 1][j]
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weight[i]] + value[i])
      }
    }
  }

  return dp[itemSize - 1][bagSize]
}

console.log(bag([1, 3, 4], [15, 20, 30], 4))
