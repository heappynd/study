const str = 'abcde'

console.log(str.repeat(3))

String.prototype.myRepeat = function (count) {
  let newStr = ''
  for (let i = 0; i < count; i++) {
    newStr += this
  }
  return newStr
}

console.log(str.myRepeat(4))

const myReverse = function (str) {
  const strArr = str.split('')
  let head = 0
  let tail = strArr.length - 1

  while (head < tail) {
    let temp = strArr[head]
    strArr[head] = strArr[tail]
    strArr[tail] = temp
    head++
    tail--
  }

  return strArr.join('')
}

console.log(myReverse(str))
