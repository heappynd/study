class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

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
