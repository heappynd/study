import { BTree } from './tree'

function preorder(root: BTree | null) {
  if (!root) {
    return
  }
  console.log(root.val)
  preorder(root.left)
  preorder(root.right)
}

console.log('----')

preorder(BTree)
