import { ListNode } from './utils/index'

function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  let l3 = new ListNode()
  let p1 = l1
  let p2 = l2
  let p3 = l3
  let carry = 0
  while (p1 !== null || p2 !== null) {
    const v1 = p1 === null ? 0 : p1.val
    const v2 = p2 === null ? 0 : p2.val
    const v3 = v1 + v2 + carry
    carry = Math.trunc(v3 / 10)
    p3.next = new ListNode(v3 % 10)

    p3 = p3.next
    if (p1 !== null) {
      p1 = p1.next
    }
    if (p2 !== null) {
      p2 = p2.next
    }
  }
  if (carry !== 0) {
    p3.next = new ListNode(carry)
  }
  return l3.next
}
