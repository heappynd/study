import { track, trigger } from './effect'

export function reactive<T extends object>(obj: T) {
  return new Proxy(obj, {
    get(target, p: string, receiver) {
      track(target, p)

      return target[p]
    },
    set(target, p: string, value, receiver) {
      target[p] = value
      trigger(target, p)
      return true
    },
  })
}
