/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  nums.sort((a, b) => a - b)

  const len = nums.length
  const res = []

  // 穷举 threeSum 的第一个数
  for (let i = 0; i < len; i++) {
    // 对 target - nums[i] 计算 twoSum
    const tuples = twoSumTarget(nums, i + 1, 0 - nums[i])
    // const tuples = twoSumTarget(nums, i + 1, target - nums[i])
    // 如果存在满足条件的二元组，再加上 nums[i] 就是结果三元组
    for (let j = 0; j < tuples.length; j++) {
      const tuple = tuples[j]
      tuple.push(nums[i])
      res.push(tuple)
    }
    // 跳过第一个数字重复的情况，否则会出现重复结果
    while (i < len - 1 && nums[i] === nums[i + 1]) {
      i++
    }
  }

  return res

  function twoSumTarget(nums, start, target) {
    // nums.sort((a, b) => a - b)
    let res = []
    let lo = start,
      hi = nums.length - 1
    while (lo < hi) {
      let sum = nums[lo] + nums[hi]
      let leftVal = nums[lo]
      let rightVal = nums[hi]
      // 根据 sum 和 target 的比较，移动左右指针
      // Move left and right pointers based on the comparison between sum and target
      if (sum < target) {
        while (lo < hi && nums[lo] === leftVal) {
          lo++
        }
      } else if (sum > target) {
        while (lo < hi && nums[hi] === rightVal) {
          hi--
        }
      } else {
        res.push([leftVal, rightVal])
        while (lo < hi && nums[lo] === leftVal) {
          lo++
        }
        while (lo < hi && nums[hi] === rightVal) {
          hi--
        }
      }
    }
    return res
  }
}
// @lc code=end
