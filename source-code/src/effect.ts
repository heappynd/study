import { ITERATE_KEY, shouldTrack } from './reactive'

type ReactiveEffect = {
  (): any
  deps: Dep[]
  options: Options
}
type Dep = Set<ReactiveEffect>
type KeyToDepMap = Map<any, Dep>

const targetMap = new WeakMap<any, KeyToDepMap>()

let activeEffect: ReactiveEffect | undefined
let effectStack: ReactiveEffect[] = []

type Options = {
  scheduler?: (fn: () => void) => any
  lazy?: boolean
}
export function effect(fn: () => any, options: Options = {}) {
  const effectFn: ReactiveEffect = () => {
    console.log('包装副作用函数执行')
    cleanup(effectFn)
    activeEffect = effectFn
    // 在调用副作用函数前 把当前副作用函数压入栈
    effectStack.push(effectFn)
    // 将fn的执行结果存储到res中
    const res = fn()
    // 在当前副作用函数执行完毕后，将当前副作用函数弹出栈
    effectStack.pop()
    // 并把activeEffect还原为之前的值
    activeEffect = effectStack[effectStack.length - 1]
    // 将res作为effectfn的返回值
    return res
  }
  // 将options挂载到effectFn上
  effectFn.options = options
  effectFn.deps = []
  // 只有非lazy才执行副作用函数
  if (!options.lazy) {
    effectFn()
  }
  // 将副作用函数作为返回值
  return effectFn
}

function cleanup(effectFn: ReactiveEffect) {
  effectFn.deps.forEach((dep) => {
    dep.delete(effectFn)
  })
  effectFn.deps.length = 0
}

export function track(target: any, key: string) {
  // 当禁止追踪时 直接返回
  if (!activeEffect || !shouldTrack) return
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let deps = depsMap.get(key)
  if (!deps) {
    deps = new Set()
    depsMap.set(key, deps)
  }
  deps.add(activeEffect)
  activeEffect.deps.push(deps)
}

export enum TriggerType {
  ADD,
  SET,
  DELETE,
}

export function trigger(target: any, key: string, type: TriggerType, newVal: any) {
  const depsMap = targetMap.get(target)
  if (!depsMap) {
    return
  }
  // 取得与key相关联的副作用函数
  const effects = depsMap.get(key)

  const effectsToRun: Dep = new Set()
  effects &&
    effects.forEach((effectFn) => {
      // 如果触发的副作用函数和当前正在执行的副作用函数相同 则不触发执行
      if (effectFn !== activeEffect) {
        effectsToRun.add(effectFn)
      }
    })
  if (type === TriggerType.ADD || type === TriggerType.DELETE) {
    // 取得与iterate_key相关联的副作用函数
    const iterateEffects = depsMap.get(ITERATE_KEY)
    iterateEffects &&
      iterateEffects.forEach((effectFn) => {
        if (effectFn !== activeEffect) {
          effectsToRun.add(effectFn)
        }
      })
  }
  // 当操作类型为ADD 且目标对象是数组时 应该取出那些与length属性相关联的副作用函数
  if (type === TriggerType.ADD && Array.isArray(target)) {
    const lengthEffects = depsMap.get('length')
    lengthEffects &&
      lengthEffects.forEach((effectFn) => {
        if (effectFn !== activeEffect) {
          effectsToRun.add(effectFn)
        }
      })
  }
  // 如果目标是数组 且修改了数组的length属性
  if (Array.isArray(target) && key === 'length') {
    // 对于索引值大于或等于新的length值的属性
    // 需要把所有相关联的副作用函数取出 并添加到effectsRun中待执行
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

  effectsToRun.forEach((fn) => {
    // 如果一个副作用函数存在调度器 则调用调度器 并将副作用函数作为参数传递
    if (fn.options.scheduler) {
      fn.options.scheduler(fn)
    } else {
      // 否则直接执行副作用函数 （默认）
      fn()
    }
  })
}
