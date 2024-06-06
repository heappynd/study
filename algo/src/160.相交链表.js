/*
 * @lc app=leetcode.cn id=160 lang=javascript
 *
 * [160] 相交链表
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
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
  let pA = headA
  let pB = headB

  while (pA !== pB) {
    if (pA == null) {
      pA = headB
    } else {
      pA = pA.next
    }

    if (pB == null) {
      pB = headA
    } else {
      pB = pB.next
    }
  }
  return pA
}
// @lc code=end
