let arr = [1, [2, [3, 4, 5, [6, 7]]]]

/**
 *
 * @param {any[]} arr
 */
function flatten(arr) {
  let newArr = []
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    if (Array.isArray(item)) {
      newArr = newArr.concat(flatten(item))
    } else {
      newArr.push(item)
    }
  }
  return newArr
}

console.log(flatten(arr))
