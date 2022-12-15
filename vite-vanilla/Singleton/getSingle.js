export function getSingle(fn) {
  let result = null
  return function () {
    if (!result) {
      result = fn.apply(this, arguments)
    }
    return result
  }
}
