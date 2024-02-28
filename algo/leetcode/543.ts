import { TreeNode } from '../structure/TreeNode'

function diameterOfBinaryTree(root: TreeNode | null): number {
  let diameter = 0

  function maxDepth(node: TreeNode | null) {
    if (node === null) {
      return 0
    }
    let leftMax = maxDepth(node.left)
    let rightMax = maxDepth(node.right)

    let myDiameter = leftMax + rightMax

    diameter = Math.max(myDiameter, diameter)

    return Math.max(leftMax, rightMax) + 1
  }

  maxDepth(root)

  return diameter
}
