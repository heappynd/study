import { track, trigger } from './effect'

export function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      track(target, key)
      // receiver 它代表谁在读取属性
      return Reflect.get(target, key, receiver)
    },
    set(target, key, newValue, receiver) {
      target[key] = newValue
      trigger(target, key)
      return true
    },
  })
}
