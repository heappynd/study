import { isAlpha } from '@vue-3/utils'

const State = {
  initial: 1,
  tagOpen: 2,
  tagName: 3,
  text: 4,
  tagEnd: 5,
  tagEndName: 6,
}

type Token = {
  type: string
  content?: string
  name?: string
}

export function tokenize(str: string) {
  let currentState = State.initial
  const chars: string[] = []
  const tokens: Token[] = []
  while (str) {
    const char = str[0]
    switch (currentState) {
      case State.initial:
        if (char === '<') {
          currentState = State.tagOpen
          str = str.slice(1)
        } else if (isAlpha(char)) {
          currentState = State.text
          chars.push(char)
          str = str.slice(1)
        }
        break
      case State.tagOpen:
        if (isAlpha(char)) {
          currentState = State.tagName
          chars.push(char)
          str = str.slice(1)
        } else if (char === '/') {
          currentState = State.tagEnd
          str = str.slice(1)
        }
        break
      case State.tagName:
        if (isAlpha(char)) {
          chars.push(char)
          str = str.slice(1)
        } else if (char === '>') {
          currentState = State.initial
          tokens.push({
            type: 'tag',
            name: chars.join(''),
          })
          chars.length = 0
          str = str.slice(1)
        }
        break
      case State.text:
        if (isAlpha(char)) {
          chars.push(char)
          str = str.slice(1)
        } else if (char === '<') {
          currentState = State.tagOpen
          tokens.push({
            type: 'text',
            content: chars.join(''),
          })
          chars.length = 0
          str = str.slice(1)
        }
        break
      case State.tagEnd:
        if (isAlpha(char)) {
          currentState = State.tagEndName
          chars.push(char)
          str = str.slice(1)
        }
        break
      case State.tagEndName:
        if (isAlpha(char)) {
          chars.push(char)
          str = str.slice(1)
        } else if (char === '>') {
          currentState = State.initial
          tokens.push({
            type: 'tagEnd',
            name: chars.join(''),
          })
          chars.length = 0
          str = str.slice(1)
        }
        break
    }
  }

  return tokens
}

export function parse(str: string) {
  const tokens = tokenize(str)

  const root = {
    type: 'Root',
    children: [],
  }
  const elementStack = [root]

  while (tokens.length) {
    const parent = elementStack[elementStack.length - 1]
    const t = tokens[0]
    switch (t.type) {
      case 'tag':
        const elementNode = {
          type: 'Element',
          tag: t.name,
          children: [],
        }
        parent.children.push(elementNode)
        elementStack.push(elementNode)
        break
      case 'text':
        const textNode = {
          type: 'Text',
          content: t.content,
        }
        parent.children.push(textNode)
        break
      case 'tagEnd':
        elementStack.pop()
        break
    }
    tokens.shift()
  }

  return root
}

export function dump(node, indent = 0) {
  const type = node.type
  const desc = node.type === 'Root' ? '' : node.type === 'Element' ? node.tag : node.content

  console.log(`${'-'.repeat(indent)}${type}: ${desc}`)

  if (node.children) {
    node.children.forEach((n) => dump(n, indent + 2))
  }
}

export function traverseNode(ast, context) {
  context.currentNode = ast

  const transforms = context.nodeTransforms
  for (let i = 0; i < transforms.length; i++) {
    transforms[i](context.currentNode, context)
    if (!context.currentNode) return
  }

  const children = context.currentNode.children
  if (children) {
    for (let i = 0; i < children.length; i++) {
      context.parent = context.currentNode
      context.childIndex = i
      traverseNode(children[i], context)
    }
  }
}
