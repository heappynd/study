const obj = Object.create({ a: 2 })

obj.a = 1

console.log('obj', obj)

function create(obj) {
  function F() {}
  F.prototype = obj
  return new F()
}

const newObj = create({ a: 2 })

// newObj.a = 2

console.log('newObj', newObj)
