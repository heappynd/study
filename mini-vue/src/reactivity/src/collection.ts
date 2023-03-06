import { track, trigger } from './effect'
import { ITERATE_KEY } from './reactive'

const reactiveMap = new Map()
// reactive 函数与之前相比没有变化
export function reactive(obj) {
  const existionProxy = reactiveMap.get(obj)
  if (existionProxy) return existionProxy
  const proxy = createReactive(obj)

  reactiveMap.set(obj, proxy)

  return proxy
}
// 定义一个对象，将自定义的 add 方法定义到该对象下
const mutableInstrumentations = {
  add(key) {
    // this 仍然指向的是代理对象，通过 raw 属性获取原始数据对象
    const target = this.raw
    // 先判断值是否已经存在
    // 只有在值不存在的情况下，才需要触发响应
    const hasKey = target.has(key)
    // 通过原始数据对象执行 add 方法添加具体的值，
    // 注意，这里不再需要 .bind 了，因为是直接通过 target 调用并执行的
    const res = target.add(key)
    if (!hasKey) {
      // 调用 trigger 函数触发响应，并指定操作类型为 ADD
      trigger(target, key, 'ADD')
    }
    return res
  },
  delete(key) {
    const target = this.raw
    const hasKey = target.has(key)
    const res = target.delete(key)
    // 当要删除的元素确实存在时，才触发响应
    if (hasKey) {
      trigger(target, key, 'DELETE')
    }
    return res
  },
}
// 在 createReactive 里封装用于代理 Set/Map 类型数据的逻辑
export function createReactive(obj, isShallow = false, isReadonly = false) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      // 如果读取的是 raw 属性，则返回原始数据对象 target
      if (key === 'raw') {
        return target
      }
      if (key === 'size') {
        track(target, ITERATE_KEY)
        return Reflect.get(target, key, target)
      }
      // 返回定义在 mutableInstrumentations 对象下的方法
      return mutableInstrumentations[key]
      return target[key].bind(target)
    },
  })
}
