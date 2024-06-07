/*
 * @lc app=leetcode.cn id=92 lang=javascript
 *
 * [92] 反转链表 II
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
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
  let dummy = new ListNode(0, head)
  let p0 = dummy

  for (let i = 0; i < left - 1; i++) {
    p0 = p0.next
  }

  console.log(p0)

  // p0 2
  let pre = null
  let cur = p0.next
  for (let i = 0; i < right - left + 1; i++) {
    const nxt = cur.next
    cur.next = pre
    pre = cur
    cur = nxt
  }
  console.log('pre', pre)
  console.log('cur', cur)

  p0.next.next = cur
  p0.next = pre
  return dummy.next
}
// @lc code=end
