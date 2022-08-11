type Node = {
  type: 'FunctionDecl' | 'ReturnStatement' | 'CallExpression' | 'StringLiteral' | 'ArrayExpression'
}

interface ICtx {
  code: string
  push(code: string): void
  currentIndent: number
  newline(): void
  indent(): void
  deIndent(): void
}

export function generate(node: Node) {
  const context: ICtx = {
    // 存储最终生成的渲染函数代码
    code: '',
    // 在生成代码时 通过push完成代码的拼接
    push(code: string) {
      context.code += code
    },
    // 缩进
    currentIndent: 0,
    newline() {
      context.code += '\n' + `  `.repeat(context.currentIndent)
    },
    indent() {
      context.currentIndent++
      context.newline()
    },
    deIndent() {
      context.currentIndent--
      context.newline()
    },
  }

  genNode(node, context)

  return context.code
}

function genNode(node: Node, context: ICtx) {
  switch (node.type) {
    case 'FunctionDecl':
      genFunctionDecl(node, context)
      break
    case 'ReturnStatement':
      genReturnStatement(node, context)
      break
    case 'CallExpression':
      genCallExpression(node, context)
      break
    case 'StringLiteral':
      genStringLiteral(node, context)
      break
    case 'ArrayExpression':
      genArrayExpression(node, context)
      break
  }
}
function genFunctionDecl(node: Node, context: ICtx) {
  const { push, indent, deIndent } = context
  push(`function ${node.id.name}`)
  push(`(`)
  // 为函数的参数生成代码
  genNodeList(node.params, context)
  push(`)`)
  push(`{`)
  indent()
  node.body.forEach((n) => genNode(n, context))
  deIndent()
  push(`}`)
}

function genNodeList(nodes: unknown[], context: ICtx) {
  const { push } = context
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    genNode(node, context)
    if (i < nodes.length - 1) {
      push(', ')
    }
  }
}

function genReturnStatement(node: Node, context: ICtx) {
  const { push } = context

  push(`return `)
  genNode(node.return, context)
}

function genCallExpression(node: Node, context: ICtx) {
  const { push } = context
  const { callee, arguments: args } = node
  push(`${callee.name}(`)
  genNodeList(args, context)
  push(`)`)
}

function genStringLiteral(node: Node, context: ICtx) {
  const { push } = context

  push(`'${node.value}'`)
}

function genArrayExpression(node: Node, context: ICtx) {
  const { push } = context
  push('[')
  genNodeList(node.elements, context)
  push(']')
}
