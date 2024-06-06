/*
 * @lc app=leetcode.cn id=61 lang=javascript
 *
 * [61] 旋转链表
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
var rotateRight = function (head, k) {
  if (!head) {
    return head
  }

  reverse(head)

  let p = head
  let count = 0

  while (p) {
    if (count < k) {
      reverse()
    }
    count++
    p = p.next
  }

  function reverse(head) {
    let prev = null
    let next = null
    let curr = head

    while (curr) {
      next = curr.next
      curr.next = prev
      prev = curr
      curr = next
    }
    return prev
  }
}
// @lc code=end
