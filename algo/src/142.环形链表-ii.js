/*
 * @lc app=leetcode.cn id=142 lang=javascript
 *
 * [142] 环形链表 II
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
  let slow = head
  let fast = head
  while (fast != null && fast.next != null) {
    fast = fast.next.next
    slow = slow.next

    if (fast === slow) {
      break
    }
  }

  if (fast == null || fast.next == null) {
    return null
  }

  fast = head
  while (fast != slow) {
    slow = slow.next
    fast = fast.next
  }
  return slow
}
// @lc code=end
