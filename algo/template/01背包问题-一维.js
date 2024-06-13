/**
 *
 * @param {number[]} weight
 * @param {number[]} value
 * @param {number} bagSize
 */
function bag(weight, value, bagSize) {
  const itemSize = weight.length
  let dp = new Array(bagSize + 1).fill(0)

  // dp[0] = 0

  for (let i = 0; i < itemSize; i++) {
    for (let j = bagSize; j >= weight[i]; j--) {
      dp[j] = Math.max(dp[j], dp[j - weight[i]] + value[i])
    }
  }

  return dp[bagSize]
}

console.log(bag([1, 3, 4], [15, 20, 30], 4))
