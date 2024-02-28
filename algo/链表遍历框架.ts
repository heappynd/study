import { ListNode } from './structure/ListNode'

function traverse3(head: ListNode) {
  for (let p: ListNode | null = head; p !== null; p = p.next) {
    console.log(p.val)
  }
}

function traverse4(head: ListNode | null) {
  if (head === null) {
    return
  }

  console.log(head.val)

  traverse4(head.next)

  console.log('后序', head.val)
}
//    1 2 3 4 5
let n1 = new ListNode(11)
let n2 = new ListNode(22)
let n3 = new ListNode(33)
let n4 = new ListNode(44)
let n5 = new ListNode(55)
n1.next = n2
n2.next = n3
n3.next = n4
n4.next = n5

traverse4(n1)
