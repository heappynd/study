import { LinkedList } from './linked-list'
import { Node } from '../models/linked-list-models'

export class CircularLinkedList<T> extends LinkedList<T> {
  push(element: T): void {
    const node = new Node(element)
    let current

    if (this.head == null) {
      this.head = node
    } else {
      current = this.getElementAt(this.size() - 1)!
      current.next = node
    }

    // set node.next to head - to have circular list
    node.next = this.head

    this.count++
  }
  insert(element: T, index: number) {
    if (index >= 0 && index <= this.count) {
      let current = this.head
      let node = new Node(element)
      if (index === 0) {
        if (this.head === undefined) {
          this.head = node
          node.next = this.head
        } else {
          node.next = current
          current = this.getElementAt(this.size() - 1)
          this.head = node
          current!.next = this.head
        }
      } else {
        const previous = this.getElementAt(index - 1)!
        node.next = previous.next
        previous.next = node
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
        if (this.size() === 1) {
          this.head = undefined
        } else {
          const removed = this.head
          current = this.getElementAt(this.size() - 1)!
          this.head = this.head!.next
          current.next = this.head
          current = removed
        }
      } else {
        // no need to update last element for circular list
        const previous = this.getElementAt(index - 1)!
        current = previous.next
        previous.next = current!.next
      }
      this.count--
      return current!.element
    }
    return undefined
  }
}
