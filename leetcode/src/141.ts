import { ListNode } from './utils/index'

// 环形链表
function hasCycle(head: ListNode | null): boolean {
  // 快慢指针
  let p1 = head
  let p2 = head
  while (p1 && p2 && p2.next) {
    p1 = p1.next
    p2 = p2.next.next

    if (p1 === p2) {
      return true
    }
  }
  return false
}
