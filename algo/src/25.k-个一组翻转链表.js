/*
 * @lc app=leetcode.cn id=25 lang=javascript
 *
 * [25] K 个一组翻转链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
  // 求链表长度
  let n = 0
  let cur = head
  while (cur) {
    n++
    cur = cur.next
  }
  const dummy = new ListNode(0, head)
  let pre = null
  p0 = dummy
  cur = dummy.next

  // 剩余长度 大于 K
  while (n >= k) {
    n -= k

    for (let i = 0; i < k; i++) {
      const nxt = cur.next
      cur.next = pre
      pre = cur
      cur = nxt
    }

    // 记录它 因为下次循环 它是需要反转链表的上一个节点
    const nxt = p0.next
    p0.next.next = cur
    p0.next = pre
    p0 = nxt
  }

  return dummy.next
}
// @lc code=end
