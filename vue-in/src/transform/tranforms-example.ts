function transformText(currentNode, context) {
  if (currentNode.type === 'Text') {
    currentNode.content = currentNode.content.repeat(2)
    context.replaceNode({
      type: 'Element',
      tag: 'span',
    })
    // context.removeNode()
  }
}

function transformElement(node, context) {
  // 返回一个会在退出节点时执行的回调函数
  return () => {
    console.log('在这里编写退出节点的逻辑，当这里的代码运行时，当前转换节点的子节点一定处理完毕了')
  }
}

function transformA(node) {
  console.log('transformA 进入阶段执行', node)
  return () => {
    console.log('transformA 退出阶段执行', node)
  }
}

function transformB(node) {
  console.log('transformB 进入阶段执行', node)
  return () => {
    console.log('transformB 退出阶段执行', node)
  }
}
