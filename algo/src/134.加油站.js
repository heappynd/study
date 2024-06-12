/*
 * @lc app=leetcode.cn id=134 lang=javascript
 *
 * [134] 加油站
 */

// @lc code=start
/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function (gas, cost) {
  let curSum = 0
  let totalSum = 0
  let start = 0

  for (let i = 0; i < gas.length; i++) {
    curSum += gas[i] - cost[i]
    totalSum += gas[i] - cost[i]

    if (curSum < 0) {
      // 说明 i 之前的都不适合做起始位置
      start = i + 1
      curSum = 0
    }
  }

  if (totalSum < 0) {
    // 从哪里开始都不可以找到解
    return -1
  }
  return start
}
// @lc code=end
