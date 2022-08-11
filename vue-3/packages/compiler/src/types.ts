export type ElementNode = {
  type: 'Element'
  tag: string
  children: (ElementNode | TextNode)[]
}
export type TextNode = {
  type: 'Text'
  content: string
}
export type RootNode = {
  type: 'Root'
  children: (ElementNode | TextNode)[]
}

export type Node = ElementNode | TextNode | RootNode

export function hasChildren(node: Node): node is ElementNode | RootNode {
  return node.type !== 'Text'
}
