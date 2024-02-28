import { TreeNode } from './structure/TreeNode'

function traverse(node: TreeNode | null) {
  if (node === null) {
    return
  }
  console.log('我已经进入节点 %s 啦', node.val)

  traverse(node.left)
  traverse(node.right)

  console.log('我将要离开节点 %s 啦', node.val)
}

//        1
//    2       3
//  4   5
let t1 = new TreeNode(1)
let t2 = new TreeNode(2)
let t3 = new TreeNode(3)
let t4 = new TreeNode(4)
let t5 = new TreeNode(5)
t1.left = t2
t1.right = t3
t2.left = t4
t2.right = t5

levelTraverse(t1)

function levelTraverse(root: TreeNode | null) {
  if (root === null) {
    return []
  }
  let queue = [root]
  let res: number[][] = []
  let currLevel: number[] = []

  while (queue.length > 0) {
    for (let i = 0, len = queue.length; i < len; i++) {
      let currNode = queue.shift()!
      currLevel.push(currNode.val)
      if (currNode.left !== null) {
        queue.push(currNode.left)
      }
      if (currNode.right !== null) {
        queue.push(currNode.right)
      }
    }
    res.push(currLevel)
    currLevel = []
  }

  console.log(res)

  return res
}
