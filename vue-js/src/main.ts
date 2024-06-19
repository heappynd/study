const bucket = new WeakMap()

// WeakMap  (  target -> Map  )
// Map  (  key -> Set  )
// Set (  effectFn  )

function track(target, key) {
  if (!activeEffect) return

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
function trigger(target, key, newValue) {
  const depsMap = bucket.get(target)

  if (!depsMap) return

  const effectFns = depsMap.get(key)

  const effectsToRun = new Set()

  effectFns &&
    effectFns.forEach((effectFn) => {
      if (activeEffect !== effectFn) {
        effectsToRun.add(effectFn)
      }
    })

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

export function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      console.log('get', target, key)

      track(target, key)

      // return target[key]
      // 代理对象的 get 拦截函数接收第三个参数receiver，它代表谁在读取属性，
      return Reflect.get(target, key, receiver)
    },
    set(target, key, newValue, receiver) {
      // console.log('set', target, key)
      target[key] = newValue

      trigger(target, key)

      return true
    },
  })
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
let t = 3
function fetchData() {
  t--
  let tmp = t
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(tmp)
    }, t * 1000)
  })
}

let obj = reactive({ foo: 1 })

let finalData
watch(
  () => obj.foo,
  async (newValue, oldValue) => {
    // console.log('数据变化了', newValue, oldValue)
    const res = await fetchData()
    fetchData = res
  },
  {
    immediate: true,
  }
)
obj.foo++
