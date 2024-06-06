/*
 * @lc app=leetcode.cn id=82 lang=javascript
 *
 * [82] 删除排序链表中的重复元素 II
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
var deleteDuplicates = function (head) {
  const dummy = new ListNode(-1)
  dummy.next = head
  let curr = dummy

  while (curr.next && curr.next.next) {
    const val = curr.next.val
    if (curr.next.next.val === val) {
      while (curr.next && curr.next.val === val) {
        curr.next = curr.next.next
      }
    } else {
      curr = curr.next
    }
  }

  return dummy.next
}
// @lc code=end
