/*
 * @lc app=leetcode.cn id=51 lang=javascript
 *
 * [51] N 皇后
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  const solutions = [] // 用于存储所有解决方案
  const board = Array.from({ length: n }, () => Array(n).fill('.')) // 初始化棋盘，全部填充为 '.'
  const cols = new Set() // 用于记录每列是否已有皇后
  const diag1 = new Set() // 用于记录主对角线是否已有皇后
  const diag2 = new Set() // 用于记录副对角线是否已有皇后

  // 回溯函数，从第 row 行开始放置皇后
  function backtrack(row) {
    // 如果 row 等于 n，说明成功放置了 n 个皇后，将当前棋盘状态加入 solutions
    if (row === n) {
      solutions.push(board.map((row) => row.join(''))) // 将每行拼接成字符串，并加入 solutions
      return
    }

    // 尝试在当前行的每一列放置皇后
    for (let col = 0; col < n; col++) {
      // 检查当前列和对角线是否已有皇后，如果有则跳过
      if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) {
        continue
      }

      // 放置皇后
      board[row][col] = 'Q' // 在棋盘的 (row, col) 位置放置皇后
      cols.add(col) // 记录当前列已有皇后
      diag1.add(row - col) // 记录当前主对角线已有皇后
      diag2.add(row + col) // 记录当前副对角线已有皇后

      // 递归调用 backtrack，尝试在下一行放置皇后
      backtrack(row + 1)

      // 回溯，移除当前放置的皇后
      board[row][col] = '.' // 移除皇后
      cols.delete(col) // 移除当前列的记录
      diag1.delete(row - col) // 移除当前主对角线的记录
      diag2.delete(row + col) // 移除当前副对角线的记录
    }
  }

  backtrack(0) // 从第 0 行开始回溯
  return solutions // 返回所有解决方案
}
// @lc code=end
