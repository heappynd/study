/*
 * @lc app=leetcode.cn id=235 lang=javascript
 *
 * [235] 二叉搜索树的最近公共祖先
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  // 二叉搜索树的特点
  // 左子树的值都比根节点小 右比大
  const x = root.val
  if (p.val < x && q.val < x) {
    return lowestCommonAncestor(root.left, p, q)
  }
  if (p.val > x && q.val > x) {
    return lowestCommonAncestor(root.right, p, q)
  }
  return root
}
// @lc code=end
