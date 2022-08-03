function patchKeyedChildren(n1: VNode, n2: VNode, container: Container) {
  const oldChildren = n1.children
  const newChildren = n2.children
  let oldStartIdx = 0
  let oldEndIdx = oldChildren!.length - 1
  let newStartIdx = 0
  let newEndIdx = newChildren!.length - 1
  let oldStartVNode = oldChildren[oldStartIdx]
  let oldEndVNode = oldChildren[oldEndIdx]
  let newStartVNode = newChildren[newStartIdx]
  let newEndVNode = newChildren[newEndIdx]

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // debugger
    if (!oldStartVNode) {
      oldStartVNode = oldChildren[++oldStartIdx]
    } else if (!oldEndVNode) {
      oldEndVNode = oldChildren[--oldEndIdx]
    } else if (oldStartVNode.key === newStartVNode.key) {
      console.log('新前 旧前')
      patch(oldEndVNode, newEndVNode, container)
      newStartVNode = newChildren[++newStartIdx]
      oldStartVNode = oldChildren[++oldStartIdx]
    } else if (newEndVNode.key === oldEndVNode.key) {
      console.log('新后 旧后')
      patch(oldEndVNode, newEndVNode, container)
      newEndVNode = newChildren[--newEndIdx]
      oldEndVNode = oldChildren[--oldEndIdx]
    } else if (newEndVNode.key === oldStartVNode.key) {
      console.log('新后 旧前')
      patch(oldStartVNode, newEndVNode, container)
      insert(oldStartVNode.el, container, oldEndVNode.el.nextSibling)
      oldStartVNode = oldChildren[++oldStartIdx]
      newEndVNode = newChildren[--newEndIdx]
    } else if (newStartVNode.key === oldEndVNode.key) {
      console.log('新前 旧后')
      patch(oldEndVNode, newStartVNode, container)
      insert(oldEndVNode.el, container, oldStartVNode.el)
      oldEndVNode = oldChildren[--oldEndIdx]
      newStartVNode = newChildren[++newStartIdx]
    } else {
      console.log('no')
      const idxInOld = oldChildren.findIndex((node) => node.key === newStartVNode.key)
      console.log(idxInOld)

      if (idxInOld > 0) {
        const vnodeToMove = oldChildren[idxInOld]
        patch(vnodeToMove, newStartIdx, container)
        insert(vnodeToMove.el, container, oldStartVNode.el)
        oldChildren[idxInOld] = undefined
        newStartVNode = newChildren[++newStartIdx]
      } else {
        patch(null, newStartVNode, container, oldStartVNode.el)
      }
    }
  }

  if (oldEndIdx < oldStartIdx && newStartIdx <= newEndVNode) {
    // 说明有新的节点遗漏
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      patch(null, newChildren[i], container, oldStartVNode.el)
    }
  } else if (newEndIdx < newStartIdx && oldStartIdx <= oldEndIdx) {
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      unmount(oldChildren[i])
    }
  }
}
