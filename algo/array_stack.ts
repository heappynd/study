/* 基于数组实现的栈 */
class ArrayStack {
  private stack: number[]
  constructor() {
    this.stack = []
  }

  /* 获取栈的长度 */
  get size(): number {
    return this.stack.length
  }

  /* 判断栈是否为空 */
  isEmpty(): boolean {
    return this.stack.length === 0
  }

  /* 入栈 */
  push(num: number): void {
    this.stack.push(num)
  }

  /* 出栈 */
  pop(): number | undefined {
    if (this.isEmpty()) throw new Error('栈为空')
    return this.stack.pop()
  }

  /* 访问栈顶元素 */
  top(): number | undefined {
    if (this.isEmpty()) throw new Error('栈为空')
    return this.stack[this.stack.length - 1]
  }

  /* 返回 Array */
  toArray() {
    return this.stack
  }
}
