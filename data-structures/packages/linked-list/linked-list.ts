import { Node } from '../models/linked-list-models'
import { defaultEquals } from '../utils'
import { ILinkedList } from './inferface'

export class LinkedList<T> implements ILinkedList<T> {
  count: number = 0
  head: Node<T> | undefined = undefined

  isEmpty() {
    return this.size() === 0
  }
  size() {
    return this.count
  }
  getHead() {
    return this.head
  }

  push(element: T) {
    const node = new Node(element)
    if (this.head === undefined) {
      this.head = node
    } else {
      let current = this.head
      while (current.next !== undefined) {
        current = current.next
      }
      current.next = node
    }
    this.count++
  }

  getElementAt(index: number) {
    if (index >= 0 && index <= this.count) {
      let current = this.head
      for (let i = 0; i < index && current !== undefined; i++) {
        current = current.next
      }
      return current
    }
    return undefined
  }

  insert(element: T, index: number) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element)
      if (index === 0) {
        const current = this.head
        this.head = node
        node.next = current
      } else {
        const previous = this.getElementAt(index - 1)!
        const current = previous.next
        previous.next = node
        node.next = current
      }
      this.count++
      return true
    }
    return false
  }

  indexOf(element: T) {
    let current = this.head
    for (let i = 0; i < this.count && current !== undefined; i++) {
      if (defaultEquals(current.element, element)) {
        return i
      }
      current = current.next
    }
    return -1
  }

  remove(element: T) {
    const index = this.indexOf(element)
    return this.removeAt(index)
  }
  removeAt(index: number) {
    if (index >= 0 && index < this.count) {
      let current = this.head
      if (index === 0) {
        this.head = current?.next
      } else {
        const previous = this.getElementAt(index - 1)!
        current = previous.next
        previous.next = current?.next
      }
      this.count--
      return current?.element
    }
    return undefined
  }
  clear(): void {
    this.head = undefined
    this.count = 0
  }
  toString(): string {
    if (this.head == null) {
      return ''
    }
    let objString = `${this.head.element}`
    let current = this.head.next
    for (let i = 1; i < this.size() && current != null; i++) {
      objString = `${objString},${current.element}`
      current = current.next
    }
    return objString
  }
}
