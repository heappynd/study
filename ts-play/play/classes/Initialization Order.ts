class Base {
  name = 'base'
  constructor() {
    console.log('My name is ' + this.name)
  }
}

class Derived extends Base {
  name = 'derived'
  constructor() {
    super()
    console.log('My name is ' + this.name)
  }
}

// Prints "base", not "derived"
const d = new Derived()
console.log(d)
