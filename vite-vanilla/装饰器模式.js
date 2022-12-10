Function.prototype.before = function (beforeFn) {
  let self = this
  return function () {
    beforeFn.apply(this, arguments)
    return self.apply(this, arguments)
  }
}

Function.prototype.after = function (afterFn) {
  let self = this
  return function () {
    const result = self.apply(this, arguments)
    afterFn.apply(this, arguments)
    return result
  }
}

function test() {
  console.log('11111')
}

let test1 = test
  .before(function () {
    console.log('before')
  })
  .after(function () {
    console.log('after')
  })

test1()
