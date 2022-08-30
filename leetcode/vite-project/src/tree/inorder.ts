import { BTree } from './tree'

function inorder(root: BTree | null) {
  if (!root) {
    return
  }
  // inorder(root.left)
  // console.log(root.val)
  // inorder(root.right)
  const stack = []
  let p = root
  debugger
  while (stack.length || p) {
    while (p) {
      stack.push(p)
      p = p.left
    }
    const n = stack.pop()!
    console.log(n.val)
    p = n.right
  }
}
console.log('---')

inorder(BTree)
