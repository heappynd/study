export {}

class Base {
  private _length = 0
  k = 4

  get length() {
    return this._length
  }
  set length(value) {
    this._length = value
  }

  greet() {
    console.log('greet')
  }
}

class Derived extends Base {
  constructor() {
    super()
    this.length
  }
  // a derived class follow its base class contract.
  greet(name: string) {
    super.greet()
  }
}

const b: Base = new Derived()
b.greet()
