const obj = {}

const p = new Proxy(obj, {
  get(...args) {
    console.log('args', args)
    return Reflect.get(...args)
  },
  getPrototypeOf(target) {
    console.log('target', target)
    return Reflect.getPrototypeOf(target)
  },
  setPrototypeOf(target, v) {
    console.log('sadsdsa')
    return Reflect.setPrototypeOf(target, v)
  },
  // isExtensible(target) {
  //   return false
  // },
  // preventExtensions(target) {

  // },
  // getOwnPropertyDescriptor(target, p) {

  // },
  defineProperty(target, property, attributes) {},
  has(target, p) {},
  deleteProperty(target, p) {},
  ownKeys(target) {},

  apply(target, thisArg, argArray) {},

  construct(target, argArray, newTarget) {},

  set(target, p, newValue, receiver) {},
})

console.log(p.__proto__)

Object.getOwnPropertyDescriptors(p)

p.sss = 1
