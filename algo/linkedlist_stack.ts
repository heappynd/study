import { ListNode } from './linked_list'

export class LinkedListStack {
  #stackPeek: ListNode | null = null // 将头节点作为栈顶
  #stkSize = 0 // 栈的长度

  /* 获取栈的长度 */
  get size() {
    return this.#stkSize
  }

  /* 判断栈是否为空 */
  isEmpty() {
    return this.size === 0
  }

  push(num) {
    const node = new ListNode(num)
    node.next = this.#stackPeek
    this.#stackPeek = node
    this.#stkSize++
  }

  pop() {
    const num = this.peek()
    if (!this.#stackPeek) throw new Error('栈为空')
    this.#stackPeek = this.#stackPeek.next
    this.#stkSize--
    return num
  }

  peek() {
    if (!this.#stackPeek) {
      throw new Error('栈为空')
    }
    return this.#stackPeek.val
  }

  toArray() {
    let node = this.#stackPeek
    const res = new Array(this.size)
    for (let i = res.length - 1; i >= 0; i--) {
      res[i] = node!.val
      node = node!.next
    }
    return res
  }
}
