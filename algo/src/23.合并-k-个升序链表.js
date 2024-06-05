/*
 * @lc app=leetcode.cn id=23 lang=javascript
 *
 * [23] 合并 K 个升序链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

var mergeTwoLists = function (list1, list2) {
  let p1 = list1
  let p2 = list2
  let dummy = new ListNode(-1)
  let p = dummy
  while (p1 != null && p2 != null) {
    if (p1.val < p2.val) {
      p.next = p1
      p1 = p1.next
    } else {
      p.next = p2
      p2 = p2.next
    }
    p = p.next
  }
  if (p1 != null) {
    p.next = p1
  }
  if (p2 != null) {
    p.next = p2
  }
  return dummy.next
}

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  function merge(lists, start, end) {
    if (start === end) {
      return lists[start]
    }
    if (start > end) {
      return null
    }
    const mid = Math.floor((start + end) / 2)

    return mergeTwoLists(merge(lists, start, mid), merge(lists, mid + 1, end))
  }
  return merge(lists, 0, lists.length - 1)
}
// @lc code=end
