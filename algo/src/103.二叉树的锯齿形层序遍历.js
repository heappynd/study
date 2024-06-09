/*
 * @lc app=leetcode.cn id=103 lang=javascript
 *
 * [103] 二叉树的锯齿形层序遍历
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
 * @return {number[][]}
 */
var zigzagLevelOrder = function (root) {
  if (root === null) return []
  let q = [root]
  let ans = []

  let isOrderLeft = true

  while (q.length) {
    let vals = []
    for (let i = 0, len = q.length; i < len; i++) {
      const node = q.shift()

      if (isOrderLeft) {
        vals.push(node.val)
      } else {
        vals.unshift(node.val)
      }

      node.left && q.push(node.left)
      node.right && q.push(node.right)
    }
    isOrderLeft = !isOrderLeft
    ans.push(vals)
  }
  return ans
}
// @lc code=end
