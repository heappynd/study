function isValid(s: string): boolean {
  // 奇数直接返回
  if (s.length % 2 === 1) {
    return false
  }
  let stack: string[] = []
  let map = new Map()
  map.set('(', ')')
  map.set('[', ']')
  map.set('{', '}')
  for (const char of s) {
    if (map.has(char)) {
      stack.push(char)
    } else {
      // 取得栈顶
      let top = stack[stack.length - 1]
      if (map.get(top) === char) {
        stack.pop()
      } else {
        return false
      }
    }
  }
  return stack.length === 0
}
