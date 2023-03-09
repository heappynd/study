import { lis } from './utils'

export function fastDiff(n1, n2, container, { patch, insert, unmount }) {
  const newChildren = n2.children
  const oldChildren = n1.children
  // 处理相同的前置节点
  // 索引 j 指向新旧两组子节点的开头
  let j = 0
  let oldVNode = oldChildren[j]
  let newVNode = newChildren[j]
  // while 循环向后遍历，直到遇到拥有不同 key 值的节点为止
  while (oldVNode.key === newVNode.key) {
    // 调用 patch 函数进行更新
    patch(oldVNode, newVNode, container)
    // 更新索引 j，让其递增
    j++
    oldVNode = oldChildren[j]
    newVNode = newChildren[j]
  }
  // 更新相同的后置节点
  // 索引 oldEnd 指向旧的一组子节点的最后一个节点
  let oldEnd = oldChildren.length - 1
  // 索引 newEnd 指向新的一组子节点的最后一个节点
  let newEnd = newChildren.length - 1

  oldVNode = oldChildren[oldEnd]
  newVNode = newChildren[newEnd]
  // while 循环从后向前遍历，直到遇到拥有不同 key 值的节点为止
  while (oldVNode.key === newVNode.key) {
    // 调用 patch 函数进行更新
    patch(oldVNode, newVNode, container)
    // 递减 oldEnd 和 nextEnd
    oldEnd--
    newEnd--
    oldVNode = oldChildren[oldEnd]
    newVNode = newChildren[newEnd]
  }
  // 预处理完毕后，如果满足如下条件，则说明从 j --> newEnd 之间的节点应作为新节点插入
  if (j > oldEnd && j <= newEnd) {
    // 锚点的索引
    const anchorIndex = newEnd + 1
    // 锚点元素
    const anchor =
      anchorIndex < newChildren.length ? newChildren[anchorIndex].el : null
    // 采用 while 循环，调用 patch 函数逐个挂载新增节点
    while (j <= newEnd) {
      patch(null, newChildren[j++], container, anchor)
    }
  } else if (j > newEnd && j <= oldEnd) {
    // j -> oldEnd 之间的节点应该被卸载
    while (j <= oldEnd) {
      unmount(oldChildren[j++])
    }
  } else {
    // 增加 else 分支来处理非理想情况
    //  构造 source 数组
    //  新的一组子节点中剩余未处理节点的数量
    const count = newEnd - j + 1
    const source = new Array(count)
    source.fill(-1)

    // oldStart 和 newStart 分别为起始索引，即 j
    const oldStart = j
    const newStart = j
    // 新增两个变量，moved 和 pos
    let moved = false
    let pos = 0
    // 构建索引表
    const keyIndex = {}
    for (let i = newStart; i <= newEnd; i++) {
      keyIndex[newChildren[i].key] = i
    }
    // 新增 patched 变量，代表更新过的节点数量
    let patched = 0
    // 遍历旧的一组子节点中剩余未处理的节点
    for (let i = oldStart; i <= oldEnd; i++) {
      oldVNode = oldChildren[i]
      // 如果更新过的节点数量小于等于需要更新的节点数量，则执行更新
      if (patched <= count) {
        // 通过索引表快速找到新的一组子节点中具有相同 key 值的节点位置
        const k = keyIndex[oldVNode.key]
        if (typeof k !== 'undefined') {
          newVNode = newChildren[k]
          // 调用 patch 函数完成更新
          patch(oldVNode, newVNode, container)
          // 每更新一个节点，都将 patched 变量 +1
          patched++
          // 填充 source 数组
          source[k - newStart] = i
          // 判断节点是否需要移动
          if (k < pos) {
            moved = true
          } else {
            pos = k
          }
        } else {
          // 没找到
          unmount(oldVNode)
        }
      } else {
        // 如果更新过的节点数量大于需要更新的节点数量，则卸载多余的节点
        unmount(oldVNode)
      }
    }

    if (moved) {
      // 如果 moved 为真，则需要进行 DOM 移动操作
      // 计算最长递增子序列
      const seq = lis(source)
      console.log('计算最长递增子序列', seq)
      // s 指向最长递增子序列的最后一个元素
      let s = seq.length - 1
      // i 指向新的一组子节点的最后一个元素
      let i = count - 1
      // for 循环使得 i 递减，即按照图 11-24 中箭头的方向移动
      for (i; i >= 0; i--) {
        if (source[i] === -1) {
          // 说明索引为 i 的节点是全新的节点，应该将其挂载
          // 该节点在新 children 中的真实位置索引
          const pos = i + newStart
          const newVNode = newChildren[pos]
          // 该节点的下一个节点的位置索引
          const nextPos = pos + 1
          // 锚点
          const anchor =
            nextPos < newChildren.length ? newChildren[nextPos].el : null
          // 挂载
          patch(null, newVNode, container, anchor)
        } else if (i !== seq[s]) {
          // 如果节点的索引 i 不等于 seq[s] 的值，说明该节点需要移动
          // 该节点在新的一组子节点中的真实位置索引
          const pos = i + newStart
          const newVNode = newChildren[pos]
          // 该节点的下一个节点的位置索引
          const nextPos = pos + 1
          // 锚点
          const anchor =
            nextPos < newChildren.length ? newChildren[nextPos].el : null
          // 移动
          insert(newVNode.el, container, anchor)
        } else {
          // 当 i === seq[s] 时，说明该位置的节点不需要移动
          // 只需要让 s 指向下一个位置
          s--
        }
      }
    }
  }
}
