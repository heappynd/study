var _getElementById = document.getElementById
document.getElementById = function (id) {
  alert(1)
  return _getElementById(id) // (1)
}
var button = document.getElementById('button')

var _getElementById = document.getElementById
document.getElementById = function () {
  alert(1)
  return _getElementById.apply(document, arguments)
}
var button = document.getElementById('button')
