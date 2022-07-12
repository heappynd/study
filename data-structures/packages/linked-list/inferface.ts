import { Node, DoublyNode } from '../models/linked-list-models'

export interface ILinkedList<T> {
  count: number
  head: Node<T> | undefined

  /** 向链表尾部添加一个新元素 */
  push(element: T): void
  /** 向链表的特定位置插入一个新元素 */
  insert(element: T, index: number): boolean
  /** 返回链表中特定位置的元素。如果链表中不存在这样的元素，则返回 undefined。*/
  getElementAt(index: number): Node<T> | undefined
  /** 从链表中移除一个元素 */
  remove(element: T): T | undefined
  /** 返回元素在链表中的索引。如果链表中没有该元素则返回-1 */
  indexOf(element: T): number
  /** 从链表的特定位置移除一个元素 */
  removeAt(index: number): T | undefined

  isEmpty(): boolean
  size(): number

  toString(): string

  getHead(): Node<T> | undefined

  clear(): void
}

export interface IDoublyLinkedList<T> extends ILinkedList<T> {
  head: DoublyNode<T> | undefined
  tail: DoublyNode<T> | undefined

  getElementAt(index: number): DoublyNode<T> | undefined
  getHead(): DoublyNode<T> | undefined
  getTail(): DoublyNode<T> | undefined
  inverseToString(): string
}
