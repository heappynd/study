const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

/**
 *
 * @param {number[]} arr
 */
function sum(arr) {
  return arr.reduce((total, curr) => total + curr, 0)
}

console.log(sum(arr))

const arr2 = [1, 2, 3, [[4, 5], 6], 7, 8, 9]

console.log(arr2.toString().split(',').map(Number))

console.log(sum(arr2.toString().split(',').map(Number)))
