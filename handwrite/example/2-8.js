const arr = []

Array.prototype.myPush = function (...args) {
  for (let i = 0; i < args.length; i++) {
    this[this.length] = args[i]
  }
  // push 返回新的数组长度
  return this.length
}

const result = arr.myPush(1, 2, 3)
console.log('arr', arr, result)
