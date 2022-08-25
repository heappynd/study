import { ListNode } from './utils/index'

function deleteNode(root: ListNode | null): void {
  if (root) {
    if (root.next) {
      root.val = root.next.val
      root.next = root.next.next
    }
  }
  // while (root) {
  //   if (root.next) {
  //     root.val = root.next.val
  //   }
  //   if (root.next) {
  //     if (root.next.next) {
  //       root = root.next
  //     } else {
  //       root.next = null
  //       break
  //     }
  //   }
  // }
}
