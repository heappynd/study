import { hasChildren, Node } from './types'

export function dump(node: Node, indent = 0) {
  const type = node.type
  const desc = node.type === 'Root' ? '' : node.type === 'Element' ? node.tag : node.content

  console.log(`${'-'.repeat(indent)}${type}: ${desc}`)

  if (hasChildren(node)) {
    node.children.forEach((n) => dump(n, indent + 2))
  }
}

// 辅助函数
export function createStringLiteral(value: string) {
  return {
    type: 'StringLiteral',
    value,
  }
}

export function createIdentifier(name: string) {
  return {
    type: 'Identifier',
    name,
  }
}

export function createArrayExpression(elements: any[]) {
  return {
    type: 'ArrayExpression',
    elements,
  }
}

export function createCallExpression(callee: string, args: any[]) {
  return {
    type: 'CallExpression',
    callee: createIdentifier(callee),
    arguments: args,
  }
}

// 转换函数
export function transformText(node: Node) {
  if (node.type !== 'Text') {
    return
  }
  node.jsNode = createStringLiteral(node.content)
}
export function transformElement(node: Node) {
  return () => {
    if (node.type !== 'Element') {
      return
    }
    const callExp = createCallExpression('h', [createStringLiteral(node.tag)])
    node.children.length === 1
      ? callExp.arguments.push(node.children[0].jsNode)
      : callExp.arguments.push(createArrayExpression(node.children.map((c) => c.jsNode)))

    node.jsNode = callExp
  }
}
export function transformRoot(node: Node) {
  return () => {
    if (node.type !== 'Root') {
      return
    }
    const vnodeJSAST = node.children[0].jsNode
    node.jsNode = {
      type: 'FunctionDecl',
      id: { type: 'Identifier', name: 'render' },
      params: [],
      body: [
        {
          type: 'ReturnStatement',
          return: vnodeJSAST,
        },
      ],
    }
  }
}
