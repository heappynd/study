/*
 * @lc app=leetcode.cn id=18 lang=javascript
 *
 * [18] 四数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
  nums.sort((a, b) => a - b)

  return nSumTarget(nums, 4, 0, target)
}

function nSumTarget(nums, n, start, target) {
  const sz = nums.length
  const res = []
  // 至少是 2Sum，且数组大小不应该小于 n
  if (n < 2 || sz < n) {
    return res
  }
  // 2Sum 是 base case
  if (n === 2) {
    // 双指针那一套操作
    let lo = start,
      hi = sz - 1
    while (lo < hi) {
      let sum = nums[lo] + nums[hi]
      let left = nums[lo],
        right = nums[hi]
      if (sum < target) {
        while (lo < hi && nums[lo] === left) {
          lo++
        }
      } else if (sum > target) {
        while (lo < hi && nums[hi] === right) {
          hi--
        }
      } else {
        res.push([left, right])
        while (lo < hi && nums[lo] === left) {
          lo++
        }
        while (lo < hi && nums[hi] === right) {
          hi--
        }
      }
    }
  } else {
    // n > 2 时，递归计算 (n-1)Sum 的结果

    for (let i = start; i < sz; i++) {
      let sub = nSumTarget(nums, n - 1, i + 1, target - nums[i])
      for (const arr of sub) {
        // (n-1)Sum 加上 nums[i] 就是 nSum
        arr.push(nums[i])
        res.push(arr)
      }
      while (i < sz - 1 && nums[i] == nums[i + 1]) i++
    }
  }

  return res
}
// @lc code=end
