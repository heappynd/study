/* 在数组的索引 index 处插入元素 num */
function insert(nums, num, index) {
  for (let i = nums.length - 1; i > index; i--) {
    nums[i] = nums[i - 1]
  }
  // i = index
  nums[index] = num
  console.log(nums);
}

insert([1, 2, 5, 4, 0], 3, 1) // [1, 2, 3, 4]