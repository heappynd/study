import { track, trigger, TriggerType } from './effect'

export const ITERATE_KEY = Symbol()

export function reactive<T extends object>(obj: T) {
  return new Proxy(obj, {
    get(target, p: string, receiver) {
      if (p === 'raw') {
        return target
      }
      track(target, p)

      return Reflect.get(target, p, receiver)
    },
    set(target, p: string, newVal, receiver) {
      // 先获取旧值
      const oldVal = target[p]
      const type = Object.prototype.hasOwnProperty.call(target, p) ? TriggerType.SET : TriggerType.ADD
      const res = Reflect.set(target, p, newVal, receiver)
      // 新增一个type参数 解决全等缺陷NaN
      if (target === receiver.raw) {
        if (oldVal !== newVal && (oldVal === oldVal || newVal === newVal)) {
          trigger(target, p, type)
        }
      }
      return res
    },
    has(target, p) {
      track(target, p)
      return Reflect.has(target, p)
    },
    ownKeys(target) {
      track(target, ITERATE_KEY)
      return Reflect.ownKeys(target)
    },
    deleteProperty(target, p) {
      // 检查被操作的属性是否是对象自己的属性
      const hadKey = Object.prototype.hasOwnProperty.call(target, p)
      const res = Reflect.deleteProperty(target, p)
      if (res && hadKey) {
        trigger(target, p, TriggerType.DELETE)
      }
      return res
    },
  })
}
