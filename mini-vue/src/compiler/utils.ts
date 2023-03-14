// 一个辅助函数，用于判断是否是字母
export function isAlpha(char: string) {
  return (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')
}
export function dump(node, indent = 0) {
  const type = node.type
  const desc =
    node.type === 'Root'
      ? ''
      : node.type === 'Element'
      ? node.tag
      : node.content

  console.log(`${'-'.repeat(indent)}${type}: ${desc}`)

  if (node.children) {
    node.children.forEach((n) => dump(n, indent + 2))
  }
}
