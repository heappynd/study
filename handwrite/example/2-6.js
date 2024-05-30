const array = [1, 2, 3, 5, 1, 5, 9, 1, 2, 8]

// const r = [...new Set(array)]
// const r = Array.from(new Set(array))

// console.log(r)

/**
 *
 * @param {number[]} arr
 */
function uniqueArray(arr) {
  let map = {}
  let newArr = []
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    if (map[item]) {
      // map[item]++
    } else {
      newArr.push(item)
      map[item] = 1
    }
  }
  return newArr
}

console.log(uniqueArray(array))
