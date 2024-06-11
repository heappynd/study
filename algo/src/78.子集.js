/*
 * @lc app=leetcode.cn id=78 lang=javascript
 *
 * [78] 子集
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  let ans = []
  let path = []
  let n = nums.length

  function backtrack(start) {
    ans.push([...path])

    for (let i = start; i < n; i++) {
      path.push(nums[i])
      backtrack(i + 1)
      path.pop()
    }
  }

  backtrack(0)

  return ans
}
// @lc code=end
