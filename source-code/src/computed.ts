import { effect } from './effect'

export function computed(getter: () => any) {
  // 用来缓存上一次计算的值
  let value: any
  // 标记是否需要重新计算值 为true 意味着“脏” 需要计算
  let dirty = true

  // 将getter作为副作用函数 创建一个lazy的effect
  const effectFn = effect(getter, {
    lazy: true,
    scheduler() {
      dirty = true
    },
  })

  const obj = {
    // 当读取value时才执行effectFn "懒计算"
    get value(): any {
      if (dirty) {
        value = effectFn()
        dirty = false
      }
      return value
    },
  }

  return obj
}
