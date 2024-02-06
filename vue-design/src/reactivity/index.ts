import { track, trigger } from './effect'

export function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      track(target, key)
      return target[key]
    },
    set(target, key, newValue, receiver) {
      target[key] = newValue
      trigger(target, key)
      return true
    },
  })
}
