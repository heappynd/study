// 函数声明和变量声明都会被提升，
// 但是有一个值得注意的细节，那就是，函数会首先提升，然后才是变量！
foo()
function foo() {
  console.log(1)
}

var foo

foo()

foo = function () {
  console.log(2)
}
