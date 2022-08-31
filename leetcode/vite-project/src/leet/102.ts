import { TreeNode } from './utils'

function levelOrder(root: TreeNode | null): number[][] {
  if (!root) {
    return []
  }
  const q: [TreeNode, number][] = [[root, 0]]
  const res: number[][] = []
  while (q.length) {
    const [n, level] = q.shift()!
    if (!res[level]) {
      res[level] = [n.val]
    } else {
      res[level].push(n.val)
    }
    if (n.left) {
      q.push([n.left, level + 1])
    }
    if (n.right) {
      q.push([n.right, level + 1])
    }
  }
  return res
}

function levelOrder2(root: TreeNode | null): number[][] {
  if (!root) {
    return []
  }
  const q: TreeNode[] = [root]
  const res: number[][] = []
  while (q.length) {
    let len = q.length
    res.push([])
    while (len--) {
      const n = q.shift()!
      res[res.length - 1].push(n.val)
      if (n.left) {
        q.push(n.left)
      }
      if (n.right) {
        q.push(n.right)
      }
    }
  }
  return res
}
