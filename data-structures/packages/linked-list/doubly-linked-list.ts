import { DoublyNode, Node } from '../models/linked-list-models'
import { IDoublyLinkedList } from './inferface'
import { LinkedList } from './linked-list'

export class DoublyLinkedList<T> extends LinkedList<T> implements IDoublyLinkedList<T> {
  head: DoublyNode<T> | undefined = undefined
  tail: DoublyNode<T> | undefined = undefined

  push(element: T) {
    const node = new DoublyNode(element)
    if (this.head === undefined || this.tail === undefined) {
      this.head = node
      this.tail = node
    } else {
      this.tail.next = node
      node.prev = this.tail
      this.tail = node
    }
    this.count++
  }

  insert(element: T, index: number) {
    if (index >= 0 && index <= this.count) {
      const dnode = new DoublyNode(element)
      if (index === 0) {
        // 开头
        if (this.head === undefined) {
          // 没有任何元素
          this.head = dnode
          this.tail = dnode
        } else {
          dnode.next = this.head
          this.head.prev = dnode
          this.head = dnode
        }
      } else if (index === this.count) {
        // 末尾
        dnode.prev = this.tail
        this.tail!.next = dnode
        this.tail = dnode
      } else {
        // 中间
        const previous = this.getElementAt(index - 1)!
        const current = previous.next!
        previous.next = dnode
        current.prev = dnode
        dnode.prev = previous
        dnode.next = current
      }
      this.count++
      return true
    }
    return false
  }

  removeAt(index: number) {
    if (index >= 0 && index < this.count) {
      let current = this.head

      if (index === 0) {
        this.head = current!.next // {1}
        // if there is only one item, then we update tail as well //NEW
        if (this.count === 1) {
          // {2}
          this.tail = undefined
        } else {
          this.head!.prev = undefined // {3}
        }
      } else if (index === this.count - 1) {
        // last item //NEW
        current = this.tail // {4}
        this.tail = current!.prev
        this.tail!.next = undefined
      } else {
        current = this.getElementAt(index)!
        const previous = current.prev
        // link previous with current's next - skip it to remove
        previous!.next = current.next // {6}
        current.next!.prev = previous // NEW
      }
      this.count--
      return current!.element
    }
    return undefined
  }

  getElementAt(index: number) {
    return super.getElementAt(index) as DoublyNode<T> | undefined
  }
  getHead() {
    return this.head
  }
  getTail() {
    return this.tail
  }
  clear(): void {
    super.clear()
    this.tail = undefined
  }
  inverseToString(): string {
    if (this.tail === undefined) {
      return ''
    }
    let objString = `${this.tail.element}`
    let previous = this.tail.prev
    while (previous !== undefined) {
      objString = `${objString},${previous.element}`
      previous = previous.prev
    }
    return objString
  }
}
