type ReactiveEffect = {
  (): any
  deps: Dep[]
}
type Dep = Set<ReactiveEffect>
type KeyToDepMap = Map<any, Dep>

const targetMap = new WeakMap<any, KeyToDepMap>()

let activeEffect: ReactiveEffect | undefined
let effectStack: ReactiveEffect[] = []

export function effect(fn: () => any) {
  const effectFn: ReactiveEffect = () => {
    console.log('包装副作用函数执行')
    cleanup(effectFn)
    activeEffect = effectFn
    // 在调用副作用函数前 把当前副作用函数压入栈
    effectStack.push(effectFn)
    fn()
    // 在当前副作用函数执行完毕后，将当前副作用函数弹出栈
    effectStack.pop()
    // 并把activeEffect还原为之前的值
    activeEffect = effectStack[effectStack.length - 1]
  }
  effectFn.deps = []
  effectFn()
}

function cleanup(effectFn: ReactiveEffect) {
  effectFn.deps.forEach((dep) => {
    dep.delete(effectFn)
  })
  effectFn.deps.length = 0
}

export function track(target: any, key: string) {
  if (!activeEffect) return
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

export function trigger(target: any, key: string) {
  const depsMap = targetMap.get(target)
  if (!depsMap) {
    return
  }
  const effects = depsMap.get(key)
  const effectsToRun = new Set(effects)
  effectsToRun.forEach((fn) => fn())
}
