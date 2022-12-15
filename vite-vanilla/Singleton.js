const Singleton = function (name) {
  this.name = name
}

Singleton.instance = null

Singleton.prototype.getName = function () {
  console.log(this.name)
}

Singleton.getInstance = (function () {
  debugger
  let instance = null
  return function (name) {
    if (!instance) {
      instance = new Singleton(name)
    }
    return instance
  }
})()

const a = Singleton.getInstance('a')
const b = Singleton.getInstance('b')

console.log(a === b)
