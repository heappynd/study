export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

/* 初始化链表 1 -> 3 -> 2 -> 5 -> 4 */
// 初始化各个节点
const n0 = new ListNode(1)
const n1 = new ListNode(3)
const n2 = new ListNode(2)
const n3 = new ListNode(5)
const n4 = new ListNode(4)
// 构建节点之间的引用
n0.next = n1
n1.next = n2
n2.next = n3
n3.next = n4

/* 在链表的节点 n0 之后插入节点 P */
function insert(n0: ListNode, P: ListNode): void {
  const n1 = n0.next
  P.next = n1
  n0.next = P
}

/* 删除链表的节点 n0 之后的首个节点 */
function remove(n0: ListNode): void {
  const P = n0.next
  if (!P) {
    return
  }
  const n1 = P.next
  n0.next = n1
}

/* 访问链表中索引为 index 的节点 */
function access(head: ListNode | null, index: number): ListNode | null {
  for (let i = 0; i < index; i++) {
    if (!head) {
      return null
    }
    head = head.next
  }
  return head
}

/* 在链表中查找值为 target 的首个节点 */
function find(head: ListNode | null, target: number): number {
  let index = 0
  while (head !== null) {
    if (head.val === target) {
      return index
    }
    head = head.next
    index++
  }
  return -1
}
