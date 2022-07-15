import './style.css'

type ReactiveEffect = {
  (): any
  deps: Dep[]
}

type Dep = Set<ReactiveEffect>

type KeyToDepMap = Map<any, Dep>
const targetMap = new WeakMap<any, KeyToDepMap>()

type Target = {
  text: string
  ok: boolean
  [key: string]: any
}

const data: Target = {
  text: 'hello vue',
  ok: true,
}

const obj = new Proxy(data, {
  get(target, p: string, receiver) {
    track(target, p)

    return target[p]
  },
  set(target, p: string, value, receiver) {
    target[p] = value
    trigger(target, p)
    return true
  },
})

function track(target: Target, key: string) {
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

function trigger(target: Target, key: string) {
  const depsMap = targetMap.get(target)
  if (!depsMap) {
    return
  }
  const effects = depsMap.get(key)
  const effectsToRun = new Set(effects)
  effectsToRun.forEach((fn) => fn())
}

let activeEffect: ReactiveEffect | undefined
function effect(fn: () => any) {
  const effectFn: ReactiveEffect = () => {
    console.log('包装副作用函数执行')
    cleanup(effectFn)
    activeEffect = effectFn
    fn()
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

effect(() => {
  // console.log('副作用函数执行')
  document.body.innerText = obj.ok ? obj.text : 'not'
})

setTimeout(() => {
  obj.ok = false
}, 1000)

setTimeout(() => {
  obj.text = '123'
}, 2000)
