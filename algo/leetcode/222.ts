/**
 * @param {TreeNode} root
 * @return {number}
 */
var countNodes = function (root) {
  if (root === null) {
    return 0
  }
  let left = root.left
  let right = root.right
  let leftDepth = 1
  let rightDepth = 1

  while (left) {
    leftDepth++
    left = left.left
  }
  while (right) {
    rightDepth++
    right = right.right
  }

  if (rightDepth === leftDepth) {
    return Math.pow(2, leftDepth) - 1
  }

  let leftTreeCount = countNodes(root.left)
  let rightTreeCount = countNodes(root.right)

  return leftTreeCount + rightTreeCount + 1
}
