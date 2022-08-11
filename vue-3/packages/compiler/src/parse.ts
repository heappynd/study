import { tokenize } from './tokenize'
import { RootNode, ElementNode, TextNode } from './types'

/**
* tokens
0: {type: 'tag', name: 'div'}
1: {type: 'tag', name: 'p'}
2: {type: 'text', content: 'Vue'}
3: {type: 'tagEnd', name: 'p'}
4: {type: 'tag', name: 'p'}
5: {type: 'text', content: 'Template'}
6: {type: 'tagEnd', name: 'p'}
7: {type: 'tagEnd', name: 'div'}
*/

export function parse(str: string) {
  const tokens = tokenize(str)

  const root: RootNode = {
    type: 'Root',
    children: [],
  }
  const elementStack: [RootNode, ...ElementNode[]] = [root]

  while (tokens.length) {
    const parent = elementStack[elementStack.length - 1]
    const t = tokens[0]

    switch (t.type) {
      case 'tag':
        const elementNode: ElementNode = {
          type: 'Element',
          tag: t.name!,
          children: [],
        }
        parent.children.push(elementNode)
        elementStack.push(elementNode)
        break
      case 'text':
        const textNode: TextNode = {
          type: 'Text',
          content: t.content!,
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
