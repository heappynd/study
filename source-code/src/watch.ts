import { effect } from './effect'

type Options = {
  immediate?: boolean
  flush?: 'post' | 'sync' | 'pre'
}

export function watch(source: any, cb: (newVal: any, oldValue: any, onInvalidate: any) => any, options: Options) {
  let getter: any

  if (typeof source === 'function') {
    getter = source
  } else {
    getter = () => traverse(source)
  }

  let oldValue: any, newVal: any

  // 用来存储用户注册的过期回调
  let cleanup: any
  // 定义onInvalidate 函数
  function onInvalidate(fn: () => any) {
    cleanup = fn
  }

  // 提取scheduler函数为独立的job函数
  const job = () => {
    // 重新执行副作用函数拿到新值
    newVal = effectFn()
    // 在调用过期回调cb之前 先调用过期回调
    if (cleanup) {
      cleanup()
    }
    cb(newVal, oldValue, onInvalidate)
    // 更新旧值不然下一次会拿到错误的旧值
    oldValue = newVal
  }

  const effectFn = effect(() => getter(), {
    scheduler: () => {
      if (options.flush === 'post') {
        // 如果是post放到微任务队列中执行
        const p = Promise.resolve()
        p.then(job)
      } else {
        job()
      }
    },
    lazy: true,
  })

  // 当immediate为true立即执行job
  if (options.immediate) {
    job()
  } else {
    // 手动调用副作用函数 拿到旧值
    oldValue = effectFn()
  }
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
