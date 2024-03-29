import { effect, track, trigger } from './effect'

export function computed(getter: any) {
  // value 用来缓存上一次计算的值
  let value: any
  // dirty 标志，用来标识是否需要重新计算值，为 true 则意味着“脏”，需要计算
  let dirty = true

  // 把 getter 作为副作用函数，创建一个 lazy 的 effect
  const effectFn = effect(getter, {
    lazy: true,
    // 它会在 getter函数中所依赖的响应式数据变化时执行
    scheduler() {
      // 添加调度器，在调度器中将 dirty 重置为 true
      dirty = true
      trigger(obj, 'value')
    },
  })
  const obj = {
    // 当读取 value 时才执行 effectFn
    get value() {
      // 只有“脏”时才计算值，并将得到的值缓存到 value 中
      if (dirty) {
        value = effectFn()
        // 将 dirty 设置为 false，下一次访问直接使用缓存到 value 中的值
        dirty = false
      }
      track(obj, 'value')
      return value
    },
  }
  return obj
}
