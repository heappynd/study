/**
 * @param {TreeNode} root
 * @return {string[]}
 */
var binaryTreePaths = function (root) {
  let res = []
  const traverse = (node, path, res) => {
    if (node === null) {
      return
    }

    if (node.left === null && node.right === null) {
      res.push(path + node.val)
    }
    traverse(node.left, path + node.val + '->', res)
    traverse(node.right, path + node.val + '->', res)
  }
  traverse(root, '', res)
  return res
}
