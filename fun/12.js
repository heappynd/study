function myNew(Fn, ...args) {
  // 创建一个新对象
  const obj = {}
  // 将该对象原型指向构造函数的原型对象
  obj.__proto__ = Fn.prototype
  // 将构造函数的this执行新对象
  const result = Fn.apply(obj, args)
  // 返回值如果不是对象，就返回新对象
  return result instanceof Object ? result : obj
}
