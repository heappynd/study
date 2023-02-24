import { track, trigger } from './effect'

export function reactive(data) {
  return new Proxy(data, {
    get(target, key, receiver) {
      // console.log("拦截读取操作", key);

      track(target, key)

      return Reflect.get(target, key, receiver)
    },
    set(target, key, newVal) {
      // console.log("- 拦截设置操作", key, newVal);
      target[key] = newVal
      trigger(target, key)
      return true
    },
  })
}
