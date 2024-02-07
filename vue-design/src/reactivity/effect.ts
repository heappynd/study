import { ITERATE_KEY, TriggerType } from '.'

// 存储副作用函数的桶
const bucket = new WeakMap<object, Map<string | symbol, Set<ReactiveEffect>>>()

// effect 函数用于注册副作用函数
export function effect(fn, options = {}) {
  const effectFn = new ReactiveEffect(fn)
  effectFn.options = options
  // 只有非 lazy 的时候，才执行
  if (!options.lazy) {
    effectFn.run()
  }
  // 将副作用函数作为返回值返回
  return effectFn.run.bind(effectFn)
}
export function track(target, key) {
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
export function trigger(target, key, type: TriggerType, newValue) {
  // 根据 target 从桶中取得 depsMap，它是 key --> effects
  const depsMap = bucket.get(target)
  if (!depsMap) {
    return
  }
  // 根据 key 取得所有副作用函数 effects
  // 副作用函数集合称为 key 的依赖集合。
  const effects = depsMap.get(key)
  const effectsToRun = new Set<ReactiveEffect>()

  // 如果操作目标是数组，并且修改了数组的 length 属性
  if (Array.isArray(target) && key === 'length') {
    // 对于索引大于或等于新的 length 值的元素，
    // 需要把所有相关联的副作用函数取出并添加到 effectsToRun 中待执行
    depsMap.forEach((effects, key) => {
      if (key >= newValue) {
        effects.forEach((effectFn) => {
          if (effectFn !== activeEffect) {
            effectsToRun.add(effectFn)
          }
        })
      }
    })
  }

  // 当操作类型为 ADD 并且目标对象是数组时，应该取出并执行那些与 length
  // 属性相关联的副作用函数
  if (type === TriggerType.ADD && Array.isArray(target)) {
    const lengthEffects = depsMap.get('length')
    lengthEffects &&
      lengthEffects.forEach((effectFn) => {
        if (effectFn !== activeEffect) {
          effectsToRun.add(effectFn)
        }
      })
  }

  effects &&
    effects.forEach((effectFn) => {
      // 如果 trigger 触发执行的副作用函数与当前正在执行的副作用函数相同，
      // 则不触发执行
      if (effectFn !== activeEffect) {
        effectsToRun.add(effectFn)
      }
    })
  // 将与 ITERATE_KEY 相关联的副作用函数也添加到 effectsToRun
  if (type === TriggerType.ADD || type === TriggerType.DELETE) {
    // 取得与 ITERATE_KEY 相关联的副作用函数
    const iterateEffects = depsMap.get(ITERATE_KEY)
    iterateEffects &&
      iterateEffects.forEach((effectFn) => {
        if (effectFn !== activeEffect) {
          effectsToRun.add(effectFn)
        }
      })
  }

  effectsToRun.forEach((effectFn) => {
    // 如果一个副作用函数存在调度器，则调用该调度器，并将副作用函数作为参数传递
    if (effectFn.options.scheduler) {
      effectFn.options.scheduler(effectFn)
    } else {
      effectFn.run()
    }
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
    // 将 fn 的执行结果存储到 res 中
    const res = this.fn()
    // 在当前副作用函数执行完毕后，将当前副作用函数弹出栈，并把activeEffect 还原为之前的值
    effectStack.pop()
    activeEffect = effectStack[effectStack.length - 1]
    // 将 res 作为 effectFn 的返回值
    return res
  }
}

function cleanup(effectFn: ReactiveEffect) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    const deps = effectFn.deps[i]
    deps.delete(effectFn)
  }
  effectFn.deps.length = 0
}
