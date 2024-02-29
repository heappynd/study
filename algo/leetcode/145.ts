/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function (root) {
  if (root === null) {
    return []
  }
  const stack = [root]
  const res = []
  while (stack.length > 0) {
    const currNode = stack.pop()
    res.push(currNode.val)
    currNode.left && stack.push(currNode.left)
    currNode.right && stack.push(currNode.right)
  }
  return res.reverse()
}
