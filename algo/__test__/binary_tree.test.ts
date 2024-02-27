import { describe, it, expect, test } from 'vitest'
import { TreeNode, levelOrder, preOrder } from '../binary_tree'

test('1', () => {
  /* 初始化二叉树 */
  // 初始化节点
  let n1 = new TreeNode(1),
    n2 = new TreeNode(2),
    n3 = new TreeNode(3),
    n4 = new TreeNode(4),
    n5 = new TreeNode(5)
  // 构建节点之间的引用（指针）
  n1.left = n2
  n1.right = n3
  n2.left = n4
  n2.right = n5

  expect(levelOrder(n1)).toEqual([1, 2, 3, 4, 5])

  expect(preOrder(n1, [])).toEqual([])
})
