export function createStringLiteral(value: string) {
  return {
    type: 'StringLiteral',
    value,
  }
}

interface Identifier {
  type: 'Identifier'
  name: string
}

export function createIdentifier(name: string): Identifier {
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
