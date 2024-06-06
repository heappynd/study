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
  if (!head) {
    return head
  }

  let a = head
  let b = head

  for (let i = 0; i < k; i++) {
    if (b == null) {
      return head
    }
    b = b.next
  }

  let newHead = reverse(a, k)
  a.next = reverseKGroup(b, k)
  return newHead

  // 反转前N个
  function reverse(head, k) {
    if (!head) {
      return head
    }
    let count = 1
    let prev = null
    let next = null
    let curr = head
    while (curr) {
      if (k === count) {
        break
      }
      next = curr.next
      curr.next = prev
      prev = curr
      curr = next
    }

    // head.next = next
    return prev
  }
}
// @lc code=end
