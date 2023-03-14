import {
  createArrayExpression,
  createCallExpression,
  createStringLiteral,
} from '../ast'

export function transformElement(node) {
  // 将转换代码编写在退出阶段的回调函数中，
  // 这样可以保证该标签节点的子节点全部被处理完毕
  return () => {
    if (node.type !== 'Element') {
      return
    }
    // 1. 创建 h 函数调用语句,
    // h 函数调用的第一个参数是标签名称，因此我们以 
    // node.tag 来创建一个字符串字面量节点
    // 作为第一个参数
    const callExp = createCallExpression('h', [createStringLiteral(node.tag)])
    // 2. 处理 h 函数调用的参数
    node.children.length === 1
      ? callExp.arguments.push(node.children[0].jsNode)
      : callExp.arguments.push(
          createArrayExpression(node.children.map((c) => c.jsNode))
        )

    node.jsNode = callExp
  }
}
