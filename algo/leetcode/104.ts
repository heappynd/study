import { TreeNode } from '../structure/TreeNode'

function maxDepth2(root: TreeNode | null): number {
  let res = 0
  let depth = 0
  function traverse(node: TreeNode | null) {
    if (node === null) {
      return
    }
    depth++
    if (node.left === null && node.right === null) {
      res = Math.max(res, depth)
    }
    traverse(node.left)
    traverse(node.right)
    depth--
  }

  traverse(root)

  return res
}

function maxDepth(root: TreeNode | null): number {
  if (root === null) {
    return 0
  }

  let leftMaxDepth = maxDepth(root.left)
  let rightMaxDepth = maxDepth(root.right)

  return Math.max(leftMaxDepth, rightMaxDepth) + 1
}
