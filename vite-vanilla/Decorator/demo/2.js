var a = function () {
  alert(1)
}
var _a = a
a = function () {
  _a()
  alert(2)
}
a()

window.onload = function () {
  alert(1)
}
var _onload = window.onload || function () {}
window.onload = function () {
  _onload()
  alert(2)
}
