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
  get(key) {
    // 获取原始对象
    const target = this.raw
    // 判断读取的 key 是否存在
    const had = target.has(key)
    // 追踪依赖，建立响应联系
    track(target, key)
    // 如果存在，则返回结果。这里要注意的是，如果得到的结果 res 仍然是可代理的数据，
    // 则要返回使用 reactive 包装后的响应式数据
    if (had) {
      const res = target.get(key)
      return typeof res === 'object' ? reactive(res) : res
    }
  },
  set(key, value) {
    const target = this.raw
    const had = target.has(key)
    // 获取旧值
    const oldValue = target.get(key)
    // 获取原始数据，由于 value 本身可能已经是原始数据，
    // 所以此时value.raw 不存在，则直接使用 value
    const rawValue = value.raw || value
    // 设置新值
    target.set(key, rawValue)
    // 如果不存在，则说明是 ADD 类型的操作，意味着新增
    if (!had) {
      trigger(target, key, 'ADD')
    } else if (
      oldValue !== value ||
      (oldValue === oldValue && value === value)
    ) {
      // 如果不存在，并且值变了，则是 SET 类型的操作，意味着修改
      trigger(target, key, 'SET')
    }
  },
  forEach(callback, thisArg) {
    // wrap 函数用来把可代理的值转换为响应式数据
    const wrap = (val) => (typeof val === 'object' ? reactive(val) : val)
    // 取得原始数据对象
    const target = this.raw
    // 与 ITERATE_KEY 建立响应联系
    track(target, ITERATE_KEY)
    // 通过原始数据对象调用 forEach 方法，并把 callback 传递过去
    target.forEach((v, k) => {
      // 手动调用 callback，用 wrap 函数包裹
      // value 和 key 后再传给callback，这样就实现了深响应
      // 通过 .call 调用 callback，并传递 thisArg
      callback.call(thisArg, wrap(v), wrap(k), this)
    })
  },
  [Symbol.iterator]: iterationMethod,
  entries: iterationMethod,
  values: valuesIterationMethod,
  keys: keysIterationMethod
}

function iterationMethod() {
  // 获取原始数据对象 target
  const target = this.raw
  // 获取原始迭代器方法
  const itr = target[Symbol.iterator]()
  const wrap = (val) =>
    typeof val === 'object' && val !== null ? reactive(val) : val
  // 调用 track 函数建立响应联系
  track(target, ITERATE_KEY)
  // 返回自定义的迭代器
  return {
    next() {
      // 调用原始迭代器的 next 方法获取 value 和 done
      const { value, done } = itr.next()
      return {
        // 如果 value 不是 undefined，则对其进行包裹
        value: value ? [wrap(value[0]), wrap(value[1])] : value,
        done,
      }
    },
    // 实现可迭代协议
    [Symbol.iterator]() {
      return this
    },
  }
}

function valuesIterationMethod() {
  const target = this.raw
  const itr = target.values()
  const wrap = (val) => (typeof val === 'object' ? reactive(val) : val)
  track(target, ITERATE_KEY)
  return {
    next() {
      const { value, done } = itr.next()
      return {
        // value 是值，而非键值对，所以只需要包裹 value 即可
        value: wrap(value),
        done,
      }
    },
    [Symbol.iterator]() {
      return this
    },
  }
}

export const MAP_KEY_ITERATE_KEY = Symbol()
function keysIterationMethod() {
  const target = this.raw
  const itr = target.keys()
  const wrap = (val) => (typeof val === 'object' ? reactive(val) : val)
  // 调用 track 函数追踪依赖，在副作用函数与 MAP_KEY_ITERATE_KEY 之间建立响应联系
  track(target, MAP_KEY_ITERATE_KEY)
  return {
    next() {
      const { value, done } = itr.next()
      return {
        // value 是值，而非键值对，所以只需要包裹 value 即可
        value: wrap(value),
        done,
      }
    },
    [Symbol.iterator]() {
      return this
    },
  }
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
