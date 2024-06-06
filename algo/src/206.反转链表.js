/*
 * @lc app=leetcode.cn id=206 lang=javascript
 *
 * [206] 反转链表
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
 * @return {ListNode}
 */
var reverseList = function (head) {
  if (!head) {
    return head
  }
  let curr = head
  let prev = null
  let next = null
  while (curr) {
    next = curr.next
    
    curr.next = prev

    prev = curr
    curr = next
  }

  return prev
}
// @lc code=end
