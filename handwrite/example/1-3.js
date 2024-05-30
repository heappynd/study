function _new(constructor, ...args) {
  if (typeof constructor !== 'function') {
    console.error('type error')
    return
  }
  let newObject = null
  newObject = Object.create(constructor.prototype)
  let result = null
  result = constructor.apply(newObject, args)
  if (typeof result === 'object' && result !== null) {
    return result
  } else {
    return newObject
  }
}

function Person(name) {
  this.name = name
}
const p = _new(Person, 'zhangsan')

console.log('p', p)
