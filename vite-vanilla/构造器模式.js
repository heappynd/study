export {}

let employee1 = {
  name: 'John',
  age: 30,
}

let employee2 = {
  name: 'Jane',
  age: 20,
}
// 构造器模式
function Employee(name, age) {
  this.name = name
  this.age = age

  this.say = function () {
    console.log(this.name + this.age)
  }
}
// 原型模式
Employee.prototype.sayHello = function () {
  console.log('Hello ' + this.name + ' ' + this.age)
}

let employee = new Employee('John', 30)

console.log(employee)
employee.say()
employee.sayHello()
