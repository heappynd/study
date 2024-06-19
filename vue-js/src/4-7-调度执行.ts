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
      // console.log('get', target, key)

      track(target, key)

      return target[key]
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
    fn()
    effectStack.pop()
    activeEffect = effectStack[effectStack.length - 1]
  }
  // deps就是与当前副作用函数存在联系的依赖集合
  effectFn.deps = []

  // 将 options 挂载到 effectFn 上
  effectFn.options = options

  // 每次副作用函数执行时，我们可以 先把它从所有与之关联的依赖集合中删除，

  effectFn()
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

let obj = reactive({ foo: 1 })

effect(
  function () {
    console.log(obj.foo)
  },
  {
    scheduler(fn) {
      // 每次调度时，将副作用函数添加到 jobQueue 队列中
      jobQueue.add(fn)
      flushJob()
    },
  }
)

obj.foo += 2
obj.foo += 3

console.log('end')
