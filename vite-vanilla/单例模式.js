let SingletonX = (function () {
  let instance
  function User(name, age) {
    this.name = name
    this.age = age
  }

  return function (name, age) {
    if (!instance) {
      instance = new User(name, age)
    }
    return instance
  }
})()

// console.log(SingletonX() === SingletonX())

class Singleton {
  constructor(name, age) {
    if (!Singleton.instance) {
      this.name = name
      this.age = age
      Singleton.instance = this
    }
    return Singleton.instance
  }
}

console.log(new Singleton() === new Singleton())
