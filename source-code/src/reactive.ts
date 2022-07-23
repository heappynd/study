import { track, trigger, TriggerType } from './effect'

export const ITERATE_KEY = Symbol()

export function reactive<T extends object>(obj: T) {
  return createReactive(obj)
}
export function shallowReactive<T extends object>(obj: T) {
  return createReactive(obj, true)
}
export function readonly<T extends object>(obj: T) {
  return createReactive(obj, false, true)
}
export function shallowReadonly<T extends object>(obj: T) {
  return createReactive(obj, true, true)
}

function createReactive(obj: object, isShallow = false, isReadonly = false) {
  return new Proxy(obj, {
    get(target, p: string, receiver) {
      if (p === 'raw') {
        return target
      }
      // 非只读的时候才需要追踪
      if (!isReadonly) {
        track(target, p)
      }

      const res = Reflect.get(target, p, receiver)

      // 如果是浅响应直接返回原始值
      if (isShallow) {
        return res
      }

      if (typeof res === 'object' && res !== null) {
        return isReadonly ? readonly(res) : reactive(res)
      }

      return res
    },
    set(target, p: string, newVal, receiver) {
      if (isReadonly) {
        console.warn(`属性${p}是只读的`)
        return true
      }
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
      if (isReadonly) {
        console.warn(`属性${p}是只读的`)
        return true
      }
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
