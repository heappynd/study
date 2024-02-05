// 存储副作用函数的桶
const bucket = new WeakMap<object, Map<string, Set<ReactiveEffect>>>()

export function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      track(target, key)
      return target[key]
    },
    set(target, key, newValue, receiver) {
      target[key] = newValue
      trigger(target, key)
      return true
    },
  })
}

// 存储被注册的副作用函数
let activeEffect: ReactiveEffect | null = null
// effect 栈
const effectStack: ReactiveEffect[] = []
class ReactiveEffect {
  // 用来存储所有与该副作用函数相关联的依赖集合
  deps: Set<ReactiveEffect>[] = []

  options: any

  constructor(private fn: (...args: any[]) => any) {}
  run() {
    // 调用 cleanup 函数完成清除工作
    cleanup(this)
    activeEffect = this
    // 在调用副作用函数之前将当前副作用函数压入栈中
    effectStack.push(this)
    this.fn()
    // 在当前副作用函数执行完毕后，将当前副作用函数弹出栈，并把activeEffect 还原为之前的值
    effectStack.pop()
    activeEffect = effectStack[effectStack.length - 1]
  }
}

function cleanup(effectFn: ReactiveEffect) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    const deps = effectFn.deps[i]
    deps.delete(effectFn)
  }
  effectFn.deps.length = 0
}

// effect 函数用于注册副作用函数
export function effect(fn, options = {}) {
  const effectFn = new ReactiveEffect(fn)
  effectFn.options = options
  effectFn.run()
}
function track(target, key) {
  if (!activeEffect) return
  // 根据 target 从“桶”中取得 depsMap，它也是一个 Map 类型：key --> effects
  let depsMap = bucket.get(target)
  if (!depsMap) {
    depsMap = new Map()
    bucket.set(target, depsMap)
  }
  // 再根据 key 从 depsMap 中取得 deps，它是一个 Set 类型，
  let deps = depsMap.get(key)
  if (!deps) {
    deps = new Set()
    depsMap.set(key, deps)
  }
  // 里面存储着所有与当前 key 相关联的副作用函数：effects
  deps.add(activeEffect)
  // deps 就是一个与当前副作用函数存在联系的依赖集合
  // 将其添加到 activeEffect.deps 数组中
  activeEffect.deps.push(deps)
}
function trigger(target, key) {
  // 根据 target 从桶中取得 depsMap，它是 key --> effects
  const depsMap = bucket.get(target)
  if (!depsMap) {
    return
  }
  // 根据 key 取得所有副作用函数 effects
  // 副作用函数集合称为 key 的依赖集合。
  const effects = depsMap.get(key)
  const effectsToRun = new Set<ReactiveEffect>()

  effects &&
    effects.forEach((effectFn) => {
      // 如果 trigger 触发执行的副作用函数与当前正在执行的副作用函数相同，
      // 则不触发执行
      if (effectFn !== activeEffect) {
        effectsToRun.add(effectFn)
      }
    })

  effectsToRun.forEach((effectFn) => {
    // 如果一个副作用函数存在调度器，则调用该调度器，并将副作用函数作为参数传递
    if (effectFn.options.scheduler) {
      effectFn.options.scheduler(effectFn)
    } else {
      effectFn.run()
    }
  })
}
