// Chain.prototype.setNextSuccessor 指定在链中的下一个节点
// Chain.prototype.passRequest 传递请求给某个节点
var Chain = function (fn) {
  this.fn = fn
  this.successor = null
}
Chain.prototype.setNextSuccessor = function (successor) {
  return (this.successor = successor)
}
Chain.prototype.passRequest = function () {
  var ret = this.fn.apply(this, arguments)
  if (ret === 'nextSuccessor') {
    return (
      this.successor &&
      this.successor.passRequest.apply(this.successor, arguments)
    )
  }
  return ret
}
Chain.prototype.next = function () {
  return (
    this.successor &&
    this.successor.passRequest.apply(this.successor, arguments)
  )
}

var fn1 = new Chain(function () {
  console.log(1)
  return 'nextSuccessor'
})
var fn2 = new Chain(function () {
  console.log(2)
  var self = this
  setTimeout(function () {
    self.next()
  }, 1000)
})
var fn3 = new Chain(function () {
  console.log(3)
})
fn1.setNextSuccessor(fn2).setNextSuccessor(fn3)
fn1.passRequest()
