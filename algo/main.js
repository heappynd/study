/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  if (nums.length === 0) return 0
  const set = new Set(nums)

  let group = []

  for (const num of set) {
    // 检查是不是开头

    if (set.has(num - 1)) {
      // 不是开头
    } else {
      // 是开头
      let len = 1
      let x = num
      while (set.has(x + 1)) {
        len++
        x++
      }
      group.push(len)
    }
  }

  return Math.max(...group)
}

console.log(longestConsecutive([100, 4, 200, 1, 3, 2]))
