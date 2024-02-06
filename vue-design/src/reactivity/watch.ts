import { effect } from './effect'
// watch 函数接收两个参数，source 是响应式数据，cb 是回调函数
export function watch(source, cb, options = { immediate: false }) {
  let getter
  // 如果 source 是函数，说明用户传递的是 getter，所以直接把 source 赋值给 getter
  if (typeof source === 'function') {
    getter = source
  } else {
    getter = () => traverse(source)
  }
  let oldValue, newValue
  // cleanup 用来存储用户注册的过期回调
  let cleanup
  function onInvalidate(fn) {
    cleanup = fn
  }

  // 触发读取操作，从而建立联系
  const effectFn = effect(getter, {
    scheduler() {
      job()
    },
    lazy: true,
  })

  const job = () => {
    // 在 scheduler 中重新执行副作用函数，得到的是新值
    newValue = effectFn()
    // 在调用回调函数 cb 之前，先调用过期回调
    if (cleanup) {
      cleanup()
    }
    // 当数据变化时，调用回调函数 cb
    cb(newValue, oldValue, onInvalidate)
    // 更新旧值，不然下一次会得到错误的旧值
    oldValue = newValue
  }
  if (options.immediate) {
    job()
  } else {
    oldValue = effectFn()
  }
}

function traverse(value, seen = new Set()) {
  // 如果要读取的数据是原始值，或者已经被读取过了，那么什么都不做
  if (typeof value !== 'object' || value === null || seen.has(value)) {
    return
  }
  // 将数据添加到 seen 中，代表遍历地读取过了，避免循环引用引起的死循环
  seen.add(value)
  // 暂时不考虑数组等其他结构
  // 假设 value 就是一个对象，使用 for...in 读取对象的每一个值，
  // 并递归地调用 traverse 进行处理
  for (const k in value) {
    traverse(value[k], seen)
  }
  return value
}
