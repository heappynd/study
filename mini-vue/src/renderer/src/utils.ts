/**
 * @description 使用 shouldSetAsProps 函数判断是否应该作为 DOM Properties设置
 */
export function shouldSetAsProps(el, key, value) {
  // 特殊处理
  if (key === 'form' && el.tagName === 'INPUT') {
    return false
  }
  // 兜底
  // 用 in 操作符判断 key 是否存在对应的 DOM Properties
  return key in el
}

export const isString = (val: unknown): val is string => typeof val === 'string'
export const isArray = Array.isArray
export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'

export function normalizeClass(value: unknown): string {
  let res = ''
  if (isString(value)) {
    res = value
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i])
      if (normalized) {
        res += normalized + ' '
      }
    }
  } else if (isObject(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + ' '
      }
    }
  }
  return res.trim()
}

/**
 * @description 根据 source 数组计算出它的最长递增子序列
 * @param arr
 * @returns
 */
export function lis(arr) {
  const p = arr.slice()
  const result = [0]
  let i, j, u, v, c
  const len = arr.length
  for (i = 0; i < len; i++) {
    const arrI = arr[i]
    if (arrI !== 0) {
      j = result[result.length - 1]
      if (arr[j] < arrI) {
        p[i] = j
        result.push(i)
        continue
      }
      u = 0
      v = result.length - 1
      while (u < v) {
        c = ((u + v) / 2) | 0
        if (arr[result[c]] < arrI) {
          u = c + 1
        } else {
          v = c
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1]
        }
        result[u] = i
      }
    }
  }
  u = result.length
  v = result[u - 1]
  while (u-- > 0) {
    result[u] = v
    v = p[v]
  }
  return result
}

// 任务缓存队列，用一个 Set 数据结构来表示，这样就可以自动对任务进行去重
const queue = new Set()
// 一个标志，代表是否正在刷新任务队列
let isFlushing = false
// 创建一个立即 resolve 的 Promise 实例
const p = Promise.resolve()
export function queueJob(job) {
  // 调度器的主要函数，用来将一个任务添加到缓冲队列中，并开始刷新队列
  // 将 job 添加到任务队列 queue 中
  queue.add(job)
  // 如果还没有开始刷新队列，则刷新之
  if (!isFlushing) {
    // 将该标志设置为 true 以避免重复刷新
    isFlushing = true
    // 在微任务中刷新缓冲队列
    p.then(() => {
      try {
        // 执行任务队列中的任务
        queue.forEach((job) => job())
      } finally {
        // 重置状态
        isFlushing = false
      }
    })
  }
}
