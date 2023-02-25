const data = {}
export const p = new Proxy(data, {
  getPrototypeOf(target) {},
  setPrototypeOf(target, v) {},
  isExtensible(target) {},
  preventExtensions(target) {},
  getOwnPropertyDescriptor(target, p) {},
  defineProperty(target, property, attributes) {},
  has(target, p) {},
  get(target, p, receiver) {},
  set(target, p, newValue, receiver) {},
  deleteProperty(target, p) {},
  ownKeys(target) {},
  apply(target, thisArg, argArray) {},
  construct(target, argArray, newTarget) {},
})
