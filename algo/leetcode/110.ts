/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function (root) {
  const getDepth = (node) => {
    if (root === null) {
      return 0
    }
    let leftDepth = getDepth(node.left)
    if (leftDepth === -1) return -1
    let rightDepth = getDepth(node.right)
    if (rightDepth === -1) return -1
    if (Math.abs(leftDepth - rightDepth) > 1) {
      return -1
    }
    return Math.max(leftDepth, rightDepth) + 1
  }
  return getDepth(root) !== -1
}
