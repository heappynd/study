import { RootNode, ElementNode, hasChildren, Node, TextNode } from './types'
import { dump } from './utils'

interface IContext {
  nodeTransforms: ((node: Node, context: IContext) => void)[]

  currentNode: Node | null
  parent: RootNode | ElementNode | null
  replaceNode(node: ElementNode | TextNode): void
  removeNode(): void

  childIndex: number
}

export function traverseNode(ast: Node, context: IContext) {
  context.currentNode = ast

  const transforms = context.nodeTransforms
  for (let i = 0; i < transforms.length; i++) {
    transforms[i](context.currentNode, context)
    if (!context.currentNode) return // ?
  }

  if (hasChildren(context.currentNode)) {
    const children = context.currentNode.children
    for (let i = 0; i < children.length; i++) {
      context.parent = context.currentNode
      context.childIndex = i
      traverseNode(children[i], context)
    }
  }
}

export function transformElement(node: Node) {
  if (node.type === 'Element' && node.tag === 'p') {
    node.tag = 'h1'
  }
}
export function transformText(node: Node, context: IContext) {
  if (node.type === 'Text') {
    context.removeNode()
  }
}

export function transform(ast: RootNode) {
  const context: IContext = {
    nodeTransforms: [transformElement, transformText],
    currentNode: null,
    parent: null,
    childIndex: 0,
    replaceNode(node) {
      context.currentNode = node
      context.parent!.children[context.childIndex] = node
    },
    removeNode() {
      if (context.parent) {
        context.parent.children.splice(context.childIndex, 1)
        context.currentNode = null
      }
    },
  }
  traverseNode(ast, context)

  dump(ast)
}
