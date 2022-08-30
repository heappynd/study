import { BTree } from './tree'

function postorder(root: BTree | null) {
  if (!root) {
    return
  }
  // postorder(root.left)
  // postorder(root.right)
  // console.log(root.val)
  debugger
  const stack = [root]
  const outputStack = []
  while (stack.length) {
    const n = stack.pop()!
    outputStack.push(n)
    if (n.left) {
      stack.push(n.left)
    }
    if (n.right) {
      stack.push(n.right)
    }
  }
  while (outputStack.length) {
    const n = outputStack.pop()!
    console.log(n.val)
  }
}

console.log('----')

postorder(BTree)
