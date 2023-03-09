export function simpleDiff(n1, n2, container, { patch, insert, unmount }) {
  // 代码运行到这里，则说明新旧子节点都是一组子节点，这里涉及核心的 Diff 算法
  // TODO: core diff algorithm
  // 将旧的一组子节点全部卸载
  // n1.children.forEach((c) => unmount(c))
  // 再将新的一组子节点全部挂载到容器中
  // n2.children.forEach((c) => patch(null, c, container))
  const oldChildren = n1.children
  const newChildren = n2.children
  // 用来存储寻找过程中遇到的最大索引值
  let lastIndex = 0

  // 遍历新的children
  for (let i = 0; i < newChildren.length; i++) {
    const newVNode = newChildren[i]
    // 遍历旧的 children
    let j = 0
    // 在第一层循环中定义变量 find，代表是否在旧的一组子节点中找到可复用的节点
    // 初始值为 false，代表没找到
    let find = false
    for (j; j < oldChildren.length; j++) {
      const oldVNode = oldChildren[j]
      // 如果找到了具有相同 key 值的两个节点，
      // 说明可以复用，但仍然需要调用 patch 函数更新
      if (newVNode.key === oldVNode.key) {
        // 一旦找到可复用的节点，则将变量 find 的值设为 true
        find = true
        console.log('find key same as old')
        patch(oldVNode, newVNode, container)
        if (j < lastIndex) {
          // 如果当前找到的节点在旧 children 中的索引小于最大索引值 lastIndex
          // 说明该节点对应的真实 DOM 需要移动
          console.log('需要移动')
          // 先获取 newVNode 的前一个 vnode，即 prevVNode
          const prevVNode = newChildren[i - 1]
          // 如果 prevVNode 不存在，则说明当前 newVNode 是第一个节点，它不需要移动
          if (prevVNode) {
            // 由于我们要将 newVNode 对应的真实 DOM 移动到prevVNode 所对应真实 DOM 后面
            // 所以我们需要获取 prevVNode 所对应真实 DOM 的下一个兄弟节点，并将其作为锚点
            const anchor = prevVNode.el.nextSibling
            // 调用 insert 方法将 newVNode 对应的真实 DOM 插入到锚点元素前面，
            insert(newVNode.el, container, anchor)
          }
        } else {
          // 如果当前找到的节点在旧 children 中的索引不小于最大索引值，
          // 则更新 lastIndex 的值
          lastIndex = j
        }
        break
      }
    }

    // 如果代码运行到这里，find 仍然为 false，
    // 说明当前 newVNode 没有在旧的一组子节点中找到可复用的节点
    // 也就是说，当前 newVNode 是新增节点，需要挂载
    if (!find) {
      console.log('newVNode not find in old')
      // 为了将节点挂载到正确位置，我们需要先获取锚点元素
      // 首先获取当前 newVNode 的前一个 vnode 节点
      const prevVNode = newChildren[i - 1]
      let anchor = null
      if (prevVNode) {
        // 如果有前一个 vnode 节点，则使用它的下一个兄弟节点作为锚点元素
        anchor = prevVNode.el.nextSibling
      } else {
        // 如果没有前一个 vnode 节点，说明即将挂载的新节点是第一个子节点
        // 这时我们使用容器元素的 firstChild 作为锚点
        anchor = container.firstChild
      }
      // 挂载 newVNode
      patch(null, newVNode, container, anchor)
    }
  }

  // 上一步的更新操作完成后
  // 遍历旧的一组子节点
  for (let i = 0; i < oldChildren.length; i++) {
    const oldVNode = oldChildren[i]
    // 拿旧子节点 oldVNode 去新的一组子节点中寻找具有相同 key 值的节点
    const has = newChildren.find((vnode) => vnode.key === oldVNode.key)
    if (!has) {
      // 如果没有找到具有相同 key 值的节点，则说明需要删除该节点
      // 调用 unmount 函数将其卸载
      unmount(oldVNode)
    }
  }
}
