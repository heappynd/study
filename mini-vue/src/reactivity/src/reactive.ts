import { track, trigger, TriggerType } from './effect'
export const ITERATE_KEY = Symbol()

const arrayInstrumentations = {}

const originMethod = Array.prototype.includes
;['includes', 'indexOf', 'lastIndexOf'].forEach((method) => {
  const originMethod = Array.prototype[method]
  arrayInstrumentations[method] = function (...args) {
    // this 是代理对象，先在代理对象中查找，将结果存储到 res 中
    let res = originMethod.apply(this, args)

    if (res === false || res === -1) {
      // res 为 false 说明没找到，通过 this.raw 拿到原始数组，再去其中查找并更新 res 值
      res = originMethod.apply(this.raw, args)
    }
    // 返回最终结果
    return res
  }
})

// 封装 createReactive 函数，接收一个参数 isShallow，代表是否为浅响应，
// 默认为 false，即非浅响应
// 增加第三个参数 isReadonly，代表是否只读，默认为 false，即非只读
function createReactive(data, isShallow = false, isReadonly = false) {
  return new Proxy(data, {
    // 拦截读取操作
    get(target, key, receiver) {
      // 代理对象可以通过 raw 属性访问原始数据
      if (key === 'raw') {
        return target
      }
      //  如果操作的目标对象是数组，并且 key 存在于arrayInstrumentations 上
      if (Array.isArray(target) && arrayInstrumentations.hasOwnProperty(key)) {
        // 那么返回定义在 arrayInstrumentations 上的值
        return Reflect.get(arrayInstrumentations, key, receiver)
      }
      // 非只读的时候才需要建立响应联系
      // 添加判断，如果 key 的类型是 symbol，则不进行追踪
      if (!isReadonly && typeof key !== 'symbol') {
        track(target, key)
      }

      // 得到原始值结果
      const res = Reflect.get(target, key, receiver)
      // 如果是浅响应，则直接返回原始值
      if (isShallow) {
        return res
      }
      if (typeof res === 'object' && res !== null) {
        // 调用 reactive 将结果包装成响应式数据并返回
        // 如果数据为只读，则调用 readonly 对值进行包装
        return isReadonly ? readonly(res) : reactive(res)
      }

      return res
    },
    // 拦截设置操作
    set(target, key, newVal, receiver) {
      // 如果是只读的，则打印警告信息并返回
      if (isReadonly) {
        console.warn(`属性 ${key} 是只读的`)
        return true
      }
      // 先获取旧值
      const oldVal = target[key]
      // 如果属性不存在，则说明是在添加新属性，否则是设置已有属性
      //  如果代理目标是数组，则检测被设置的索引值是否小于数组长度，
      // 如果是，则视作 SET 操作，否则是 ADD 操作
      const type = Array.isArray(target)
        ? Number(key) < target.length
          ? TriggerType.SET
          : TriggerType.ADD
        : Object.prototype.hasOwnProperty.call(target, key)
        ? TriggerType.SET
        : TriggerType.ADD
      const res = Reflect.set(target, key, newVal, receiver)
      // target === receiver.raw 说明 receiver 就是 target 的代理对象
      if (target === receiver.raw) {
        // 比较新值与旧值，只要当不全等的时候才触发响应
        // 比较新值与旧值，只有当它们不全等，并且不都是 NaN 的时候才触发响应
        if (oldVal !== newVal && (oldVal === oldVal || newVal === newVal)) {
          // 增加第四个参数，即触发响应的新值
          trigger(target, key, type, newVal)
        }
      }

      return res
    },
    has(target, p) {
      track(target, p)
      return Reflect.has(target, p)
    },
    ownKeys(target) {
      // 如果操作目标 target 是数组，则使用 length 属性作为 key 并建立响应联系
      track(target, Array.isArray(target) ? 'length' : ITERATE_KEY)
      return Reflect.ownKeys(target)
    },
    deleteProperty(target, p) {
      // 如果是只读的，则打印警告信息并返回
      if (isReadonly) {
        console.warn(`属性 ${p} 是只读的`)
        return true
      }
      // 检查被操作的属性是否是对象自己的属性
      const hasKey = Object.prototype.hasOwnProperty.call(target, p)
      // 使用 Reflect.deleteProperty 完成属性的删除
      const res = Reflect.deleteProperty(target, p)

      if (res && hasKey) {
        // 只有当被删除的属性是对象自己的属性并且成功删除时，才触发更新
        trigger(target, p, TriggerType.DELETE)
      }
      return res
    },
  })
}

// 定义一个 Map 实例，存储原始对象到代理对象的映射
const reactiveMap = new Map()

export function reactive(data) {
  // 优先通过原始对象 obj 寻找之前创建的代理对象，
  // 如果找到了，直接返回已有的代理对象
  const existionProxy = reactiveMap.get(data)
  if (existionProxy) {
    return existionProxy
  }
  // 如果不存在，则创建一个新的代理对象
  const proxy = createReactive(data)
  // 存储到 Map 中，从而避免重复创建
  reactiveMap.set(data, proxy)
  return proxy
}
export function shallowReactive(data) {
  return createReactive(data, true)
}
export function readonly(data) {
  return createReactive(data, false, true)
}
export function shallowReadonly(data) {
  return createReactive(data, true, true)
}
