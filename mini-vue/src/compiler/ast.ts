export function createStringLiteral(value) {
  return {
    type: 'StringLiteral',
    value
  }
}

export function createIdentifier(name) {
  return {
    type: 'Identifier',
    name
  }
}

export function createArrayExpression(elements) {
  return {
    type: 'ArrayExpression',
    elements
  }
}

export function createCallExpression(callee, args) {
  return {
    type: 'CallExpression',
    callee: createIdentifier(callee),
    arguments: args
  }
}