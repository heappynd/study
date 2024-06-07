/*
 * @lc app=leetcode.cn id=101 lang=javascript
 *
 * [101] 对称二叉树
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
 * @return {boolean}
 */
var isSymmetric = function (root) {
  // 在【100. 相同的树】的基础上稍加改动
  function isSameTree(p, q) {
    if (p === null || q === null) {
      return p === q
    }
    return p.val === q.val && isSameTree(p.left, q.right) && isSameTree(p.right, q.left)
  }
  return isSameTree(root.left, root.right)
}
// @lc code=end
