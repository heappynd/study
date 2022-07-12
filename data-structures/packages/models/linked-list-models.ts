export class Node<T> {
  element: T
  next: Node<T> | undefined

  constructor(element: T) {
    this.element = element
    this.next = undefined
  }
}

export class DoublyNode<T> extends Node<T> {
  next: DoublyNode<T> | undefined
  prev: DoublyNode<T> | undefined
  constructor(element: T) {
    super(element)
    this.prev = undefined
  }
}
