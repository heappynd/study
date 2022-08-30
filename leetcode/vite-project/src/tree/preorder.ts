import { BTree } from './tree'

function preorder(root: BTree | null) {
  if (!root) {
    return
  }
  // console.log(root.val)
  // preorder(root.left)
  // preorder(root.right)

  const stack = [root]
  debugger
  while (stack.length) {
    const n = stack.pop()!
    console.log(n.val)
    if (n.right) {
      stack.push(n.right)
    }
    if (n.left) {
      stack.push(n.left)
    }
  }
}

console.log('----')

preorder(BTree)
