function myInstanceOf(left, right) {
  let p = left
  while (p) {
    if (Object.getPrototypeOf(p) === right.prototype) {
      return true
    }
    p = Object.getPrototypeOf(p)
  }

  return false
}

function Foo() {
  this.name = 'foo'
}

let f = new Foo()

console.log(f instanceof Foo)
console.log(myInstanceOf(f, Foo))

console.log(Function instanceof Object)
console.log(myInstanceOf(Function, Object))
