const arr = [1, 2, 3, 4, 5]

Array.prototype.myFilter = function (cb) {
  const newArr = []
  for (let i = 0; i < this.length; i++) {
    const item = this[i]
    if (cb(item, i, this)) {
      newArr.push(item)
    }
  }
  return newArr
}

const result = arr.myFilter((value, index, array) => {
  console.log('value', value)
  console.log('index', index)
  console.log('array', array)
  return value % 2 === 0
})

console.log('result', result)
