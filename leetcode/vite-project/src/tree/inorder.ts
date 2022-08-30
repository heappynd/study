import { BTree } from './tree'

function inorder(root: BTree | null) {
  if (!root) {
    return
  }
  inorder(root.left)
  console.log(root.val)
  inorder(root.right)
}
console.log('---')

inorder(BTree)
