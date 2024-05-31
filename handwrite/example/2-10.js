const arr = [1, 2, 3]

Array.prototype.myMap = function (cb) {
  if (typeof cb !== 'function') {
    throw new Error('not function')
  }
  const len = this.length
  const newArr = []
  for (let i = 0; i < len; i++) {
    newArr.push(cb(this[i], i, this))
  }
  return newArr
}

const result = arr.myMap((item) => item + 100)
console.log('result', result)
