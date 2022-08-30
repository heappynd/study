import { BTree } from './tree'

function postorder(root: BTree | null) {
  if (!root) {
    return
  }
  postorder(root.left)
  postorder(root.right)
  console.log(root.val)
}

console.log('----')

postorder(BTree)
