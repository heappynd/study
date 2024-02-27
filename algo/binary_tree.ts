export class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null

  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val // 节点值
    this.left = left === undefined ? null : left // 左子节点引用
    this.right = right === undefined ? null : right // 右子节点引用
  }
}

/* 层序遍历 */
export function levelOrder(root: TreeNode | null): number[] {
  // 初始化队列，加入根节点
  const queue = [root]
  // 初始化一个列表，用于保存遍历序列
  const list: number[] = []
  while (queue.length) {
    let node = queue.shift() as TreeNode // 队列出队
    list.push(node.val) // 保存节点值
    if (node.left) {
      queue.push(node.left) // 左子节点入队
    }
    if (node.right) {
      queue.push(node.right) // 右子节点入队
    }
  }
  return list
}

/* 前序遍历 */
export function preOrder(root: TreeNode | null, list: any[]) {
  if (root === null) {
    return list
  }
  // 访问优先级：根节点 -> 左子树 -> 右子树
  list.push(root.val)
  preOrder(root.left, list)
  preOrder(root.right, list)
  return list
}

/* 中序遍历 */
function inOrder(root: TreeNode | null): void {
  // 访问优先级：左子树 -> 根节点 -> 右子树
}

/* 后序遍历 */
function postOrder(root: TreeNode | null): void {
  // 访问优先级：左子树 -> 右子树 -> 根节点
}
