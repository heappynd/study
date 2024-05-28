import tokenize from "./tokenize"

export default function parse(str: string) {
  const tokens = tokenize(str)
  console.log('tokens', tokens)

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
        // 如果当前 Token 是开始标签，则创建 Element 类型的 AST 节点
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
      default:
        break
    }
    // 消费已经扫描过的 token
    tokens.shift()
  }
  return root
}
