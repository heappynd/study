class ReactiveEffect {
  private _fn: any

  constructor(fn) {
    this._fn = fn
  }

  run() {
    activeEffect = this
    // 执行fn
    this._fn()
  }
}

let activeEffect: ReactiveEffect | null = null

export function effect(fn) {
  const _effect = new ReactiveEffect(fn)

  _effect.run()
}

const targetMap: Map<object, Map<string, Set<ReactiveEffect>>> = new Map()

export function track(target, key) {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    // 初始化
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  // 收集依赖
  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }
  dep.add(activeEffect!)
}

export function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  const dep = depsMap.get(key)
  if (dep) {
    dep.forEach((effect) => {
      effect.run()
    })
  }
}
