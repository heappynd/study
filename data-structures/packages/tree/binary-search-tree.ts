import { Node } from '../models/node'
import { ICompareFunction, defaultCompare, Compare } from '../utils'
import { IBinarySearchTree } from './interface'

export class BinarySearchTree<T> implements IBinarySearchTree<T> {
  compareFn: ICompareFunction<T>
  root: Node<T> | null

  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn // 用来比较节点值
    this.root = null // {1} Node 类型的根节点
  }
  insert(key: T): void {
    if (this.root === null) {
      this.root = new Node(key)
    } else {
      this.insertNode(this.root, key)
    }
  }
  insertNode(node: Node<T>, key: T): void {
    if (this.compareFn(node.key, key) === Compare.LESS_THAN) {
      if (node.left === null) {
        node.left = new Node(key)
      } else {
        this.insertNode(node.left, key)
      }
    } else {
      if (node.right === null) {
        node.right = new Node(key)
      } else {
        this.insertNode(node.right, key)
      }
    }
  }
  search(key: T): boolean {
    throw new Error('Method not implemented.')
  }
  inOrderTraverse(): void {
    throw new Error('Method not implemented.')
  }
  preOrderTraverse(): void {
    throw new Error('Method not implemented.')
  }
  postOrderTraverse(): void {
    throw new Error('Method not implemented.')
  }
  min(): T {
    throw new Error('Method not implemented.')
  }
  max(): T {
    throw new Error('Method not implemented.')
  }
  remove(key: T): void {
    throw new Error('Method not implemented.')
  }
}
