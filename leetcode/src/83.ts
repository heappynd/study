import { ListNode } from './utils/index'

// 删除排序链表中的重复元素
function deleteDuplicates(head: ListNode | null): ListNode | null {
  let p = head
  while (p !== null && p.next !== null) {
    if (p.next.val === p.val) {
      p.next = p.next.next
    } else {
      p = p.next
    }
  }
  return head
}
