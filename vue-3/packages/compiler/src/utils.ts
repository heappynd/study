import { hasChildren, Node } from './types'

export function dump(node: Node, indent = 0) {
  const type = node.type
  const desc =
    node.type === 'Root'
      ? ''
      : node.type === 'Element'
      ? node.tag
      : node.content

  console.log(`${'-'.repeat(indent)}${type}: ${desc}`)

  if (hasChildren(node)) {
    node.children.forEach((n) => dump(n, indent + 2))
  }
}
