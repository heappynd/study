Function.prototype.bind = function (context) {
  let originFunc = this
  return function (...args) {
    originFunc.apply(context, args)
  }
}
