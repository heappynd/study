/*
 * 写一个 dump 工具函数，用来打印当前 AST 中节点的信息
 */
export function dump(node, indent = 0) {
  const type = node.type
  // 节点的描述，如果是根节点，则没有描述
  // 如果是 Element 类型的节点，则使用 node.tag 作为节点的描述
  // 如果是 Text 类型的节点，则使用 node.content 作为节点的描述
  const desc = node.type === 'Root' ? '' : node.type === 'Element' ? node.tag : node.content

  // 打印节点的类型和描述信息
  console.log(`${'-'.repeat(indent)}${type}: ${desc}`)

  if (node.children) {
    node.children.forEach((n) => dump(n, indent + 2))
  }
}
