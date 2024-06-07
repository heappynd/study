/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  let minLen = nums.length + 1
  for (let i = 0; i < nums.length; i++) {
    // console.log('--------i', i)
    let j = i
    let sum = 0
    debugger
    while (j < nums.length && sum < target) {
      sum += nums[j]
      j++
    }
    // console.log(sum, i, j)
    minLen = Math.min(minLen, j - i + 1)
  }
  return minLen === nums.length + 1 ? 0 : minLen
}

console.log(minSubArrayLen(1, [1, 4, 4]))
