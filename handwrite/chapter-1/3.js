function Student(name) {
  this.name = name
}
let s = new Student('zhangsan')
console.log(s)

function objectFactory() {
  let newObject = null
  let constructor = Array.prototype.shift.call(arguments)
  let result = null
  if (typeof constructor !== 'function') {
    console.error('type error')
    return
  }
  newObject = Object.create(constructor.prototype)
  result = constructor.apply(newObject, arguments)
  let flag = result && (typeof result === 'object' || typeof result === 'function')

  return flag ? result : newObject
}

const s2 = objectFactory(function (name) {
  this.name = name
}, 'lisi')
console.log('s2', s2)
