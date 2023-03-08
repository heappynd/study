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
