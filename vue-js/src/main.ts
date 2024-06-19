const bucket = new WeakMap()

// WeakMap  (  target -> Map  )
// Map  (  key -> Set  )
// Set (  effectFn  )

function track(target, key) {
  if (!activeEffect || !shouldTrack) return

  let depsMap = bucket.get(target)

  if (!depsMap) {
    depsMap = new Map()
    bucket.set(target, depsMap)
  }

  let effectFns = depsMap.get(key)

  if (!effectFns) {
    effectFns = new Set()
    depsMap.set(key, effectFns)
  }

  effectFns.add(activeEffect)
  activeEffect.deps.push(effectFns)
}
// 将操作类型封装为一个枚举值
const TriggerType = {
  SET: 'SET',
  ADD: 'ADD',
  DELETE: 'DELETE',
}
function trigger(target, key, type, newVal) {
  const depsMap = bucket.get(target)

  if (!depsMap) return
  // 取得与 key 相关联的副作用函数
  const effectFns = depsMap.get(key)

  const effectsToRun = new Set()

  effectFns &&
    effectFns.forEach((effectFn) => {
      if (activeEffect !== effectFn) {
        effectsToRun.add(effectFn)
      }
    })

  // for in 副作用函数只有在增加、删除时 才重新执行
  // 当操作类型为 ADD 或 DELETE 时，需要触发与 ITERATE_KEY 相关联的副作用函数重新执行
  if (type === TriggerType.ADD || type === TriggerType.DELETE) {
    // 取得与 ITERATE_KEY 相关联的副作用函数
    const iterateEffects = depsMap.get(ITERATE_KEY)
    iterateEffects &&
      iterateEffects.forEach((effectFn) => {
        if (activeEffect !== effectFn) {
          effectsToRun.add(effectFn)
        }
      })
  }

  if (type === TriggerType.ADD && Array.isArray(target)) {
    // 取出与 length 相关联的副作用函数
    const lengthEffects = depsMap.get('length')
    lengthEffects &&
      lengthEffects.forEach((effectFn) => {
        if (activeEffect !== effectFn) {
          effectsToRun.add(effectFn)
        }
      })
  }

  if (Array.isArray(target) && key === 'length') {
    // 对于索引大于或等于新的 length 值的元素，
    // 需要把所有相关联的副作用函数取出并添加到 effectsToRun 中待执行
    depsMap.forEach((effects, key) => {
      if (key >= newVal) {
        effects.forEach((effectFn) => {
          if (effectFn !== activeEffect) {
            effectsToRun.add(effectFn)
          }
        })
      }
    })
  }

  effectsToRun.forEach((effectFn) => {
    // 在 trigger 动作触发副作用函数执行时，我
    // 们优先判断该副作用函数是否存在调度器，如果存在，则直接调用调
    // 度器函数，并把当前副作用函数作为参数传递过去，由用户自己控制
    // 如何执行；否则保留之前的行为，即直接执行副作用函数。
    if (effectFn.options.scheduler) {
      effectFn.options.scheduler(effectFn)
    } else {
      effectFn()
    }
  })
}
const ITERATE_KEY = Symbol()

// 如何重写 includes 方法
const arrayInstrumentations = {}
;['includes', 'indexOf', 'lastIndexOf'].forEach((method) => {
  const originMethod = Array.prototype[method]
  arrayInstrumentations[method] = function (...args) {
    // this 是代理对象，先在代理对象中查找，将结果存储到 res 中
    let res = originMethod.apply(this, args)
    if (res === false || res === -1) {
      // res 为 false 说明没找到，通过 this.raw 拿到原始数组，再去其中查找并更新 res 值
      res = originMethod.apply(this.raw, args)
    }
    return res
  }
})
// 一个标记变量，代表是否进行追踪。默认值为 true，即允许追踪
// 因为 push 类方法 会读取数组的length 也会设置数组的length
let shouldTrack = true
;['push', 'pop', 'shift', 'unshift', 'splice'].forEach((method) => {
  const originMethod = Array.prototype[method]

  arrayInstrumentations[method] = function (...args) {
    // 在调用原始方法之前，禁止追踪
    shouldTrack = false
    let res = originMethod.apply(this, args)
    // 在调用原始方法之后，恢复原来的行为，即允许追踪
    shouldTrack = true
    return res
  }
})

function createReactive(obj, isShallow = false, isReadonly = false) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      console.log('get', target, key)
      // 代理对象可以通过 raw 属性访问原始数据
      if (key === 'raw') {
        return target
      }
      // 如果操作的目标对象是数组，并且 key 存在于arrayInstrumentations 上，
      // 那么返回定义在 arrayInstrumentations 上的值
      if (Array.isArray(target) && arrayInstrumentations.hasOwnProperty(key)) {
        return Reflect.get(arrayInstrumentations, key, receiver)
      }

      // 非只读的时候才需要建立响应联系
      if (!isReadonly && typeof key !== 'symbol') {
        track(target, key)
      }
      // 得到原始值结果
      // 代理对象的 get 拦截函数接收第三个参数receiver，它代表谁在读取属性，
      const res = Reflect.get(target, key, receiver)

      // 如果是浅响应 直接返回原始值
      if (isShallow) {
        return res
      }

      if (typeof res === 'object' && res !== null) {
        // 调用 reactive 将结果包装成响应式数据并返回
        return isReadonly ? readonly(res) : reactive(res)
      }
      // return target[key]
      return res
    },
    set(target, key, newValue, receiver) {
      // console.log('set', target, key)

      if (isReadonly) {
        console.warn(`属性 ${key} 是只读的`)
        return true
      }

      const oldValue = target[key]

      // 如果属性不存在，则说明是在添加新属性，否则是设置已有属性
      // 区分类型 因为新增的时候不需要触发 for in 副作用函数
      const type = Array.isArray(target)
        ? // 如果代理目标是数组，则检测被设置的索引值是否小于数组长度，
          // 如果是，则视作 SET 操作，否则是 ADD 操作
          Number(key) < target.length
          ? TriggerType.SET
          : TriggerType.ADD
        : Object.prototype.hasOwnProperty.call(target, key)
        ? TriggerType.SET
        : TriggerType.ADD

      const res = Reflect.set(target, key, newValue, receiver)
      if (target === receiver.raw) {
        // 比较新值与旧值，只有当它们不全等，并且不都是 NaN 的时候才触发响应
        if (oldValue !== newValue && (oldValue === oldValue || newValue === newValue)) {
          // 增加第四个参数，即触发响应的新值 给数组判断用
          trigger(target, key, type, newValue)
        }
      }

      return res
    },
    deleteProperty(target, key) {
      if (isReadonly) {
        console.warn(`属性 ${key} 是只读的`)
        return true
      }
      // 检查被操作的属性是否是对象自己的属性
      const hadKey = Object.prototype.hasOwnProperty.call(target, key)

      const res = Reflect.deleteProperty(target, key)

      if (res && hadKey) {
        // 只有当被删除的属性是对象自己的属性并且成功删除时，才触发更新
        trigger(target, key, TriggerType.DELETE)
      }

      return res
    },
    has(target, key) {
      track(target, key)
      return Reflect.has(target, key)
    },
    ownKeys(target) {
      // 如果操作目标 target 是数组，则使用 length 属性作为 key 并建立响应联系
      track(target, Array.isArray(target) ? 'length' : ITERATE_KEY)
      return Reflect.ownKeys(target)
    },
  })
}
// 定义一个 Map 实例，存储原始对象到代理对象的映射
const reactiveMap = new Map()
export function reactive(obj) {
  // 优先通过原始对象 obj 寻找之前创建的代理对象，如果找到了，直接返回已有的代理对象
  const existionProxy = reactiveMap.get(obj)
  if (existionProxy) {
    return existionProxy
  }
  // 否则，创建新的代理对象
  const proxy = createReactive(obj)
  // 存储到 Map 中，从而避免重复创建
  reactiveMap.set(obj, proxy)
  return proxy
}
export function shallowReactive(obj) {
  return createReactive(obj, true)
}
export function readonly(obj) {
  return createReactive(obj, false, true)
}
export function shallowReadonly(obj) {
  return createReactive(obj, true, true)
}

let activeEffect = null
const effectStack = []

export function effect(fn, options = {}) {
  // debugger
  const effectFn = () => {
    cleanup(effectFn)
    activeEffect = effectFn
    // 当调用 effect 注册副作用函数时，将副作用函数赋值给 activeEffect
    effectStack.push(effectFn)
    const result = fn()
    effectStack.pop()
    activeEffect = effectStack[effectStack.length - 1]
    return result
  }
  // deps就是与当前副作用函数存在联系的依赖集合
  effectFn.deps = []

  // 将 options 挂载到 effectFn 上
  effectFn.options = options

  // 每次副作用函数执行时，我们可以 先把它从所有与之关联的依赖集合中删除，

  if (!options.lazy) {
    effectFn()
  }
  // 懒执行
  return effectFn
}

function cleanup(effectFn) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    const deps = effectFn.deps[i]
    deps.delete(effectFn)
  }
  effectFn.deps.length = 0
}

// 如果我们只关心最终结果而不关心过程
// 基于调度器我们可以很容易地实现此功能：
const jobQueue = new Set()
const p = Promise.resolve()
let isFlushing = false
function flushJob() {
  if (isFlushing) {
    return
  }
  isFlushing = true
  p.then(() => {
    jobQueue.forEach((job) => job())
  }).finally(() => {
    isFlushing = false
  })
}

export function computed(getter) {
  // value 用来缓存上一次计算的值
  let value
  // dirty 标志，用来标识是否需要重新计算值，为 true 则意味着“脏”，需要计算
  let dirty = true

  const effectFn = effect(getter, {
    lazy: true,
    scheduler() {
      dirty = true
      trigger(obj, 'value')
    },
  })
  const obj = {
    get value() {
      // 只有“脏”时才计算值，并将得到的值缓存到 value 中
      if (dirty) {
        value = effectFn()
        dirty = false
      }
      // 当读取 value 时，手动调用 track 函数进行追踪
      track(obj, 'value')
      return value
    },
  }
  return obj
}

export function watch(source, cb, options = {}) {
  let getter
  if (typeof source === 'function') {
    // 如果 source 是函数，说明用户传递的是 getter，所以直接把 source 赋值给 getter
    getter = source
  } else {
    // 否则按照原来的实现调用 traverse 递归地读取
    getter = () => traverse(source)
  }
  let oldValue
  let newValue
  // cleanup 用来存储用户注册的过期回调
  let cleanup
  // 定义 onInvalidate 函数
  function onInvalidate(fn) {
    // 将过期回调存储到 cleanup 中
    cleanup = fn
  }
  const job = () => {
    // 在 scheduler 中重新执行副作用函数，得到的是新值
    newValue = effectFn()
    if (cleanup) {
      cleanup()
    }
    cb(newValue, oldValue, onInvalidate)
    // 更新旧值，不然下一次会得到错误的旧值
    oldValue = newValue
  }
  const effectFn = effect(getter, {
    scheduler() {
      job()
    },
    lazy: true,
  })

  if (options.immediate) {
    job()
  } else {
    oldValue = effectFn()
  }
}
// 递归的读取操作
function traverse(value, seen = new Set()) {
  // 如果要读取的数据是原始值，或者已经被读取过了，那么什么都不做
  if (typeof value !== 'object' || value === null || seen.has(value)) {
    return
  }
  // 将数据添加到 seen 中，代表遍历地读取过了，避免"循环引用"引起的死循环
  seen.add(value)
  // 暂时不考虑数组等其他结构
  for (const k in value) {
    traverse(value[k], seen)
  }
  return value
}

// !---------------------------------------

const obj = readonly({ foo: { bar: 1 } })
obj.foo.bar = 2 // 仍然可以修改
