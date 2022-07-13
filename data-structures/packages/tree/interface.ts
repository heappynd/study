import { Node } from '../models/node'

export interface IBinarySearchTree<T> {
  insert(key: T): void
  search(key: T): boolean
  // 中序遍历
  inOrderTraverse(callback: (key: T) => any): void
  preOrderTraverse(callback: (key: T) => any): void
  postOrderTraverse(callback: (key: T) => any): void

  min(): T
  max(): T
  remove(key: T): void

  insertNode(node: Node<T>, key: T): void

  inOrderTraverseNode(node: Node<T>, callback: (key: T) => any): void
}
