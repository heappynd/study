function isValid(s: string): boolean {
  // 奇数直接返回
  if (s.length % 2 === 1) {
    return false
  }
  let stack: string[] = []
  for (const char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char)
    } else {
      // 取得栈顶
      let top = stack[stack.length - 1]
      if (
        (char === ')' && top === '(') ||
        (char === '}' && top === '{') ||
        (char === ']' && top === '[')
      ) {
        stack.pop()
      } else {
        return false
      }
    }
  }
  return stack.length === 0
}
