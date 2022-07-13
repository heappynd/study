export class Node<K> {
  key: K
  left: Node<K> | null
  right: Node<K> | null

  constructor(key: K) {
    this.key = key
    this.left = null
    this.right = null
  }

  toString() {
    return `${this.key}`
  }
}
