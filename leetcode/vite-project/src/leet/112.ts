import { TreeNode } from './utils'

function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  if (!root) {
    return false
  }
  let res = false
  function dfs(n: TreeNode | null, sum: number) {
    if (!n) return
    if (!n.left && !n.right && sum === targetSum) {
      res = true
    }
    if (n.left) {
      dfs(n.left, sum + n.left.val)
    }
    if (n.right) {
      dfs(n.right, sum + n.right.val)
    }
  }
  dfs(root, root.val)
  return res
}
