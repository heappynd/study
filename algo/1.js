const nums = [8, 2, 6, 3, 1]

const diff = new Array(nums.length)

diff[0] = nums[0]

for (let i = 1; i < nums.length; i++) {
  diff[i] = nums[i] - nums[i - 1]
}

console.log(diff)

const res = new Array(diff.length)
res[0] = diff[0]
for (let i = 1; i < diff.length; i++) {
  res[i] = res[i - 1] + diff[i]
}
console.log(res);
