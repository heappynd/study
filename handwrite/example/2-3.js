const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function random(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}
/**
 *
 * @param {any[]} arr
 */
function shuffle(arr) {
  const len = arr.length
  for (let i = 0; i < len; i++) {
    const index = random(i, len - 1)
    ;[arr[i], arr[index]] = [arr[index], arr[i]]
  }
  return arr
}

console.log(shuffle(arr))
console.log(shuffle(arr))
