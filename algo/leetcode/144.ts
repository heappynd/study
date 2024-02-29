/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function (root) {
  if (root === null) {
    return []
  }
  let stack = [root]
  let res = []
  while (stack.length > 0) {
    let currNode = stack.pop()
    res.push(currNode.val)
    currNode.right && stack.push(currNode.right)
    currNode.left && stack.push(currNode.left)
  }
  return res
}
