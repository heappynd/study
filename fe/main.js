const obj = {
  // [Symbol.toPrimitive](hint) {
  //   console.log('hint', hint)
  //   return 'test-'
  // },
}

function objToNumber(value) {
  return Number(value.valueOf().toString())
}

const t1 = new Date()
const t2 = new Date()

console.log(Number(t1.toString().valueOf()))

console.log(t1 / t2)
