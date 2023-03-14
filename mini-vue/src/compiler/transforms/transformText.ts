import { createStringLiteral } from "../ast"

export function transformText(node) {
  if (node.type !== 'Text') {
    return
  }

  node.jsNode = createStringLiteral(node.content)
}
