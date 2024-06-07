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

  const ans = []
  const n = nums.length

  // n - 2 因为要留两个数 给 j 和 k ，n-2 n-1
  // [0, n-2)
  for (let i = 0; i < n - 2; i++) {
    const x = nums[i]

    if (i > 0 && x === nums[i - 1]) {
      // 当前枚举的数和上一个数是相同的，就跳过
      // 因为不能有重复的三元组
      continue
    }
    // 优化1
    if (x + nums[i + 1] + nums[i + 2] > 0) {
      // 如果他们都大于0了，那么后面的自然也是大于0的，那就不用继续了
      break
    }
    // 优化2
    if (x + nums[n - 2] + nums[n - 1] < 0) {
      // 如果 x 和 当前最大的两个加起来都小于0， 那么前面的自然也是小于0的，
      // 那就直接枚举下一个x, 因为后面x还有机会变大
      continue
    }

    // 一左一右 ，一大一小
    let j = i + 1
    let k = n - 1
    while (j < k) {
      // 算出三个数的和
      s = x + nums[j] + nums[k]
      if (s > 0) {
        k--
      } else if (s < 0) {
        j++
      } else {
        ans.push([x, nums[j], nums[k]])
        // 这里还需要把j和k的重复也跳过，跳过方式和nums[i]是一样的
        j++
        while (j < k && nums[j] === nums[j - 1]) {
          j++
        }
        k--
        while (j < k && nums[j] === nums[k + 1]) {
          k--
        }
      }
    }
  }

  return ans
}
// @lc code=end
