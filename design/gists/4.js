function Singleton(name) {
  this.name = name
}
Singleton.prototype.getName = function () {
  console.log(this.name)
}
Singleton.getInstance = (function () {
  let instance = null
  return function (name) {
    if (!instance) {
      instance = new Singleton(name)
    }
    return instance
  }
})()
const a = Singleton.getInstance('sven1')
const b = Singleton.getInstance('sven2')
console.log(a === b) // true
