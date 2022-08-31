import { TreeNode } from './utils'

function maxDepth(root: TreeNode | null): number {
  let res = 0
  function dfs(n: TreeNode | null, level: number) {
    if (n === null) return
    if (n.left === null && n.right === null) {
      res = Math.max(res, level)
    }
    dfs(n.left, level + 1)
    dfs(n.right, level + 1)
  }
  dfs(root, 1)
  return res
}
