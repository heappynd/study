import { ITERATE_KEY } from './reactive'

const bucket = new WeakMap()

export const TriggerType = {
  SET: 'SET',
  ADD: 'ADD',
  DELETE: 'DELETE',
}

// 用一个全局变量存储当前激活的 effect 函数
let activeEffect
// effect 栈
const effectStack = []

function cleanup(effectFn) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    // deps 是依赖集合
    const deps = effectFn.deps[i]
    // 将 effectFn 从依赖集合中移除
    deps.delete(effectFn)
  }
  // 最后需要重置 effectFn.deps 数组
  effectFn.deps.length = 0
}

export function effect(fn, options = {}) {
  const effectFn = () => {
    // 调用 cleanup 函数完成清除工作
    cleanup(effectFn)
    // 当 effectFn 执行时，将其设置为当前激活的副作用函数
    activeEffect = effectFn
    // 在调用副作用函数之前将当前副作用函数压入栈中
    effectStack.push(effectFn)
    // 将 fn 的执行结果存储到 res 中
    const res = fn()
    // 在当前副作用函数执行完毕后，将当前副作用函数弹出栈，
    // 并把activeEffect 还原为之前的值
    effectStack.pop()
    activeEffect = effectStack[effectStack.length - 1]
    return res
  }
  // 将 options 挂载到 effectFn 上
  effectFn.options = options
  // activeEffect.deps 用来存储所有与该副作用函数相关联的依赖集合
  effectFn.deps = []
  if (!options.lazy) {
    // 只有非 lazy 的时候，才执行
    // 执行副作用函数
    effectFn()
  }
  // 将副作用函数作为返回值返回
  return effectFn
}

export function track(target, key) {
  // 没有 activeEffect，直接 return
  if (!activeEffect) {
    return
  }

  let depsMap = bucket.get(target)
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()))
  }

  let deps = depsMap.get(key)
  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }
  deps.add(activeEffect)
  // deps 就是一个与当前副作用函数存在联系的依赖集合
  // 将其添加到 activeEffect.deps 数组中
  activeEffect.deps.push(deps) // 新增
}
export function trigger(target, key, type) {
  const depsMap = bucket.get(target)
  if (!depsMap) return
  const effects = depsMap.get(key)
  // 取得与 ITERATE_KEY 相关联的副作用函数
  const iterateEffects = depsMap.get(ITERATE_KEY)

  const effectsToTun = new Set()
  effects &&
    effects.forEach((effectFn) => {
      // 如果 trigger 触发执行的副作用函数与当前正在执行的副作用函数相同，
      // 则不触发执行,就能够避免无限递归调用，从而避免栈溢出
      if (effectFn !== activeEffect) {
        effectsToTun.add(effectFn)
      }
    })
  // 当操作类型为 ADD 并且目标对象是数组时，应该取出并执行那些与 length属性相关联的副作用函数
  if (type === TriggerType.ADD && Array.isArray(target)) {
    // 取出与 length 相关联的副作用函数
    const lengthEffects = depsMap.get('length')
    // 将这些副作用函数添加到 effectsToRun 中，待执行
    lengthEffects &&
      lengthEffects.forEach((effectFn) => {
        if (effectFn !== activeEffect) {
          effectsToTun.add(effectFn)
        }
      })
  }

  // 只有当操作类型为 'ADD' 时，才触发与 ITERATE_KEY 相关联的副作用函数重新执行
  if (type === TriggerType.ADD || type === TriggerType.DELETE) {
    // 将与 ITERATE_KEY 相关联的副作用函数也添加到 effectsToRun
    iterateEffects &&
      iterateEffects.forEach((effectFn) => {
        if (effectFn !== activeEffect) {
          effectsToTun.add(effectFn)
        }
      })
  }
  effectsToTun.forEach((effectFn) => {
    // 如果一个副作用函数存在调度器，则调用该调度器，并将副作用函数作为参数传递
    if (effectFn.options.scheduler) {
      effectFn.options.scheduler(effectFn)
    } else {
      // 否则直接执行副作用函数（之前的默认行为）
      effectFn()
    }
  })
}
