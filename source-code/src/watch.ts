import { effect } from './effect'

export function watch(source: any, cb: () => any) {
  effect(() => traverse(source), {
    scheduler() {
      cb()
    },
  })
}

function traverse(value: any, seen = new Set()) {
  debugger
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
