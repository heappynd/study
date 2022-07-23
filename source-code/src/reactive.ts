import { track, trigger, TriggerType } from './effect'

export const ITERATE_KEY = Symbol()

// 定义一个Map实例 存储原始对象到代理对象的映射
const reactiveMap = new Map()
export function reactive<T extends object>(obj: T) {
  // 先通过原始对象obj寻找之前创建的代理对象 如果找到了就直返回已有的代理对象
  const existionProxy = reactiveMap.get(obj)
  if (existionProxy) {
    return existionProxy
  }
  const proxy = createReactive(obj)
  reactiveMap.set(obj, proxy)
  return proxy
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

// 重写includes
const arrayInstrumentations = {}
;['includes', 'indexOf', 'lastIndexOf'].forEach((method) => {
  const originMethod = Array.prototype[method]
  arrayInstrumentations[method] = function (...args: any[]) {
    // this是代理对象 先在代理对象中查找 将结果存储到res中
    let res = originMethod.apply(this, args)
    if (res === false || res === -1) {
      // res为false表示没找到 通过this.raw拿到原始数组 再去其中查找并更新res值
      res = originMethod.apply(this.raw, args)
    }
    return res
  }
})
// 一个标识变量 标识是否进行追踪 默认值为true
export let shouldTrack = true
;['push', 'pop', 'shift', 'unshift', 'splice'].forEach((method) => {
  const originMethod = Array.prototype[method]
  arrayInstrumentations[method] = function (...args) {
    // 在调用原始方法之前 禁止追踪
    shouldTrack = false
    let res = originMethod.apply(this, args)
    // 在调用之后 允许追踪
    shouldTrack = true
    return res
  }
})

function createReactive(obj: object, isShallow = false, isReadonly = false) {
  return new Proxy(obj, {
    get(target, p: string, receiver) {
      console.log('--> get', p)

      if (p === 'raw') {
        return target
      }
      // 如果操作的目标是数组 并且key存在于arrayInstrumentaions上
      // 那么返回定义在其上的值
      if (Array.isArray(target) && arrayInstrumentations.hasOwnProperty(p)) {
        return Reflect.get(arrayInstrumentations, p, receiver)
      }

      // 如果key的类型是symbol 则不进行追踪
      // 非只读的时候才需要追踪
      // 添加判断 如果key的类型是symbol 则不进行追踪
      if (!isReadonly && typeof p !== 'symbol') {
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
      // 如果属性不存在说明是在添加新的属性，否则是设置已有属性
      // 如果代理是数组则检测被设置的索引值是否小于数组长度 小于就是设置 否则新增
      const type = Array.isArray(target)
        ? Number(p) < target.length
          ? TriggerType.SET
          : TriggerType.ADD
        : Object.prototype.hasOwnProperty.call(target, p)
        ? TriggerType.SET
        : TriggerType.ADD
      const res = Reflect.set(target, p, newVal, receiver)
      // 新增一个type参数 解决全等缺陷NaN
      if (target === receiver.raw) {
        if (oldVal !== newVal && (oldVal === oldVal || newVal === newVal)) {
          // 增加第四个参数 即触发响应的新增
          trigger(target, p, type, newVal)
        }
      }
      return res
    },
    has(target, p) {
      track(target, p)
      return Reflect.has(target, p)
    },
    ownKeys(target) {
      // 如果操作的目标是数组 则使用length属性作为key建立响应关系
      track(target, Array.isArray(target) ? 'length' : ITERATE_KEY)
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
