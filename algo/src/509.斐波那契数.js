/*
 * @lc app=leetcode.cn id=509 lang=javascript
 *
 * [509] 斐波那契数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
  // 确定dp数组（dp table）以及下标的含义

  // 确定递推公式
  // dp数组如何初始化
  // 确定遍历顺序
  // 举例推导dp数组
  // if (n <= 1) {
  //   return n
  // }
  // let pre1 = 1
  // let pre2 = 0
  // let temp
  // for (let i = 2; i <= n; i++) {
  //   temp = pre1
  //   pre1 = pre1 + pre2
  //   pre2 = temp
  // }
  // return pre1

  if (n <= 1) {
    return n
  }
  return fib(n - 1) + fib(n - 2)
}
// @lc code=end
