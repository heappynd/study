console.log(-0 === +0)
console.log(NaN === NaN)

function myObjectIs(x, y) {
  if (x === y) {
    // 判断 +0 -0
    return x !== 0 || y !== 0 || 1 / x === 1 / y
  } else {
    // 判断是否是NaN
    return x !== x && y !== y
  }
}

console.log(myObjectIs(+0, -0))

console.log(myObjectIs(NaN, NaN))
