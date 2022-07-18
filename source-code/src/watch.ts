import { effect } from './effect'

export function watch(source: any, cb: (newVal: any, oldValue: any) => any) {
  let getter: any

  if (typeof source === 'function') {
    getter = source
  } else {
    getter = () => traverse(source)
  }

  let oldValue: any, newVal: any
  const effectFn = effect(() => getter(), {
    scheduler() {
      // 重新执行副作用函数拿到新值
      newVal = effectFn()
      cb(newVal, oldValue)
      // 更新旧值不然下一次会拿到错误的旧值
      oldValue = newVal
    },
    lazy: true,
  })
  // 手动调用副作用函数 拿到旧值
  oldValue = effectFn()
}

function traverse(value: any, seen = new Set()) {
  // 如果读取的是原始值 或者已经读取了 那么什么都不做
  if (typeof value !== 'object' || value === null || seen.has(value)) {
    return
  }
  // 将数据添加到seen中 代表遍历过了 避免循环引用导致的死循环
  seen.add(value)
  // 假设value是一个对象 递归读取
  for (const k in value) {
    traverse(value[k], seen)
  }

  return value
}
