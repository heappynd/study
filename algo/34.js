/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  return [searchLeft(nums, target), searchRight(nums, target)]
}

function searchLeft(nums, target) {
  let left = 0
  let right = nums.length - 1

  while (left <= right) {
    let mid = Math.floor((left + right) / 2)
    if (nums[mid] > target) {
      right = mid - 1
    } else if (nums[mid] < target) {
      left = mid + 1
    } else if (nums[mid] === target) {
      right = mid - 1
    }
  }

  if (left < 0 || left >= nums.length) {
    return -1
  }

  return nums[left] === target ? left : -1
}

function searchRight(nums, target) {
  let left = 0
  let right = nums.length - 1

  while (left <= right) {
    let mid = Math.floor((left + right) / 2)
    if (nums[mid] > target) {
      right = mid - 1
    } else if (nums[mid] < target) {
      left = mid + 1
    } else if (nums[mid] === target) {
      left = mid + 1
    }
  }

  if (right < 0 || right >= nums.length) {
    return -1
  }

  return nums[right] === target ? right : -1
}
