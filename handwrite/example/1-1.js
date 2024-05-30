const o = { o: 'o' }
const o1 = Object.create(o)
console.log('o1', o1)

console.log(o1.__proto__ === o)

function _create(o) {
  const obj = {}
  // obj.__proto__ = o
  Object.setPrototypeOf(obj, o)
  return obj
}

const o2 = _create(o)
console.log('o2', o2)

function _create2(o) {
  function F() {}
  F.prototype = o
  return new F()
}
