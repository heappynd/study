function instanceOf(a, b) {
  let p = a
  while (p) {
    if (p === b.prototype) {
      return true
    }
    p = p.__proto__
  }
  return false
}
console.log(instanceOf([], Array))
console.log(instanceOf([], Object))
console.log(instanceOf([], Function))
