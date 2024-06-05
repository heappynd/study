/*
 * @lc app=leetcode.cn id=86 lang=javascript
 *
 * [86] 分隔链表
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
 * @param {number} x
 * @return {ListNode}
 */
var partition = function (head, x) {
  const dummyMin = new ListNode(-1)
  const dummyMax = new ListNode(-1)
  let pMin = dummyMin
  let pMax = dummyMax
  let p = head
  while (p != null) {
    if (p.val >= x) {
      pMax.next = p
      pMax = p
    } else {
      pMin.next = p
      pMin = p
    }
    let temp = p.next
    p.next = null
    p = temp
  }
  pMin.next = dummyMax.next
  return dummyMin.next
}
// @lc code=end
