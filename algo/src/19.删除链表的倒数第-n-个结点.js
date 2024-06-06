/*
 * @lc app=leetcode.cn id=19 lang=javascript
 *
 * [19] 删除链表的倒数第 N 个结点
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
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  const dummy = new ListNode(-1)
  dummy.next = head
  const deleteNodePrev = findFromEnd(dummy, n + 1)
  deleteNodePrev.next = deleteNodePrev.next.next
  return dummy.next
}

function findFromEnd(head, k) {
  let fast = head
  let slow = head
  for (let i = 0; i < k; i++) {
    fast = fast.next
  }
  while (fast != null) {
    fast = fast.next
    slow = slow.next
  }
  return slow
}

// @lc code=end
