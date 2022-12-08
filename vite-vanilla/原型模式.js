export {}

class Employee {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  say() {
    console.log(this.name, this.age)
  }
}

let e = new Employee('John', 30)

console.log(e)
