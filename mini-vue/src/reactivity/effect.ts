import { extend } from '../shared'

class ReactiveEffect {
  private _fn: any
  scheduler?: any
  deps = []
  active = true
  onStop?: () => void

  constructor(fn, scheduler?) {
    this._fn = fn
    this.scheduler = scheduler
  }

  run() {
    activeEffect = this
    // 执行fn
    return this._fn()
  }

  stop() {
    if (this.active) {
      cleanupEffect(this)
      if (this.onStop) {
        this.onStop()
      }
      this.active = false
    }
  }
}

function cleanupEffect(effect: any) {
  effect.deps.forEach((dep) => dep.delete(effect))
}

let activeEffect: ReactiveEffect | null = null

export function effect(fn, options = {}) {
  const _effect = new ReactiveEffect(fn, options.scheduler)
  // _effect.onStop = options.onStop
  // options
  // extend
  extend(_effect, options)

  _effect.run()

  const runner = _effect.run.bind(_effect)
  runner.effect = _effect

  return runner
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
  if (!activeEffect) return
  dep.add(activeEffect)
  activeEffect.deps.push(dep)
}

export function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  const dep = depsMap.get(key)
  if (dep) {
    dep.forEach((effect) => {
      if (effect.scheduler) {
        effect.scheduler()
      } else {
        effect.run()
      }
    })
  }
}

export function stop(runner: any) {
  runner.effect.stop()
}
