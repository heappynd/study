/*
 * @lc app=leetcode.cn id=337 lang=javascript
 *
 * [337] 打家劫舍 III
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var rob = function (root) {
  function dfs(node) {
    if (node == null) {
      return [0, 0]
    }
    // 分类讨论的标准是：当前结点偷或者不偷
    // 由于需要后序遍历，所以先计算左右子结点，然后计算当前结点的状态值
    const left = dfs(node.left)
    const right = dfs(node.right)
    // dp[0]：以当前 node 为根结点的子树能够偷取的最大价值，规定 node 结点不偷
    // dp[1]：以当前 node 为根结点的子树能够偷取的最大价值，规定 node 结点偷

    // 如果当前结点不偷，左右子结点偷或者不偷都行，选最大者；
    // 如果当前结点偷，左右子结点均不能偷。

    const dp = [0, 0]
    dp[0] = Math.max(left[0], left[1]) + Math.max(right[0], right[1])
    dp[1] = node.val + left[0] + right[0]

    return dp
  }

  const res = dfs(root)
  return Math.max(res[0], res[1])
}
// @lc code=end
