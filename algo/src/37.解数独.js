/*
 * @lc app=leetcode.cn id=37 lang=javascript
 *
 * [37] 解数独
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function (board) {
  // 检查在 (row, col) 位置填入 num 是否有效
  function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
      // 检查行是否有重复
      if (board[row][i] === num) {
        return false
      }
      // 检查列是否有重复
      if (board[i][col] === num) {
        return false
      }
      // 检查 3x3 宫格是否有重复
      const boxRow = Math.floor(row / 3) * 3 + Math.floor(i / 3)
      const boxCol = Math.floor(col / 3) * 3 + (i % 3)
      if (board[boxRow][boxCol] === num) {
        return false
      }
    }
    return true
  }

  // 回溯算法解决数独
  function solve(board) {
    // 遍历每一个格子
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        // 如果当前格子是空的，尝试填入数字
        if (board[row][col] === '.') {
          for (let num = '1'; num <= '9'; num++) {
            // 检查 num 在 (row, col) 位置是否有效
            if (isValid(board, row, col, num)) {
              // 填入 num
              board[row][col] = num
              // 递归尝试填入下一个空格
              if (solve(board)) {
                return true // 如果成功解决数独，返回 true
              }
              // 如果 num 不能导致解决数独，回溯
              board[row][col] = '.'
            }
          }
          // 如果没有数字可填入，返回 false
          return false
        }
      }
    }
    // 如果所有格子都填入有效数字，返回 true
    return true
  }

  // 开始解决数独
  solve(board)
}
// @lc code=end
