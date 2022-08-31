import { TreeNode } from './utils'

function inorderTraversal(root: TreeNode | null): number[] {
  let res: number[] = []
  function inorder(n: TreeNode | null) {
    if (!n) {
      return
    }
    inorder(n.left)
    res.push(n.val)
    inorder(n.right)
  }
  inorder(root)
  return res
}
