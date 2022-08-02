// simple diff
const oldChildren = n1.children
const newChildren = n2.children

let lastIndex = 0 // 最大索引值

for (let i = 0; i < newChildren.length; i++) {
  const newVNode = newChildren[i]
  let find = false
  // debugger
  for (let j = 0; j < oldChildren.length; j++) {
    const oldVNode = oldChildren[j]
    if (newVNode.key === oldVNode.key) {
      find = true
      patch(oldVNode, newVNode, el)
      if (j < lastIndex) {
        // 说明要移动
        const prevVNode = newChildren[i - 1]
        if (prevVNode) {
          const anchor = prevVNode.el?.nextSibling
          insert(newVNode.el, el, anchor)
        }
      } else {
        lastIndex = j
      }
      break
    }
  }
  if (!find) {
    const prevVNode = newChildren[i - 1]
    let anchor = null
    if (prevVNode) {
      anchor = prevVNode.el?.nextSibling
    } else {
      anchor = el.firstChild
    }
    patch(null, newVNode, el, anchor)
  }
}

for (let i = 0; i < oldChildren.length; i++) {
  const oldVNode = oldChildren[i]
  const has = newChildren.find((item) => item.key === oldVNode.key)
  if (!has) {
    unmount(oldVNode)
  }
}
