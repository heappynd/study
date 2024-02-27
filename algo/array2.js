function remove(nums, index) {
  for (let i = index; i < nums.length - 1; i++) {
    nums[i] = nums[i + 1]
  }
  console.log(nums);
}

remove([1, 3, 2, 5, 4], 1)
