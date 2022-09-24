class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
}

let tree = new TreeNode(1)
tree.left = new TreeNode(11, new TreeNode(111))
tree.right = new TreeNode(12)

console.log(tree)
