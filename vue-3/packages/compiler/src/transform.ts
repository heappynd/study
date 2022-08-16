import { RootNode, ElementNode, hasChildren, Node, TextNode } from './types'
import { dump, transformElement, transformRoot, transformText } from './utils'

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

  // 增加退出阶段的回调函数
  const exitFns: any[] = []
  const transforms = context.nodeTransforms
  for (let i = 0; i < transforms.length; i++) {
    // 转换函数返回一个函数 该函数作为退出阶段的回调函数
    const onExit = transforms[i](context.currentNode, context)
    if (onExit) {
      exitFns.push(onExit)
    }

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

  let i = exitFns.length
  while (i--) {
    exitFns[i]()
  }
}

export function transform(ast: RootNode) {
  const context: IContext = {
    nodeTransforms: [transformElement, transformText, transformRoot],
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

  console.dir(ast)
  console.log(ast)

  dump(ast)
}