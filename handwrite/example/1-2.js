function _instanceof(left, right) {
  let proto = Object.getPrototypeOf(left)
  let prototype = right.prototype
  while (proto) {
    if (proto === prototype) {
      return true
    }
    proto = Object.getPrototypeOf(proto)
  }
  return false
}

function Person() {}
const p = new Person()

console.log(Person instanceof Object)

console.log(_instanceof(Person, Object))
