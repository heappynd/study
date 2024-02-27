class Heap {
  maxHeap: number[]

  constructor() {
    this.maxHeap = []
  }

  /* 获取左子节点的索引 */
  left(i: number): number {
    return 2 * i + 1
  }

  /* 获取右子节点的索引 */
  right(i: number): number {
    return 2 * i + 2
  }

  /* 获取父节点的索引 */
  parent(i: number): number {
    return Math.floor((i - 1) / 2) // 向下整除
  }

  /* 访问堆顶元素 */
  peek(): number {
    return this.maxHeap[0]
  }

  size() {
    return this.maxHeap.length
  }

  swap() {}

  /* 元素入堆 */
  push(val: number): void {
    // 添加节点
    this.maxHeap.push(val)
    // 从底至顶堆化
    this.siftUp(this.size() - 1)
  }

  /* 从节点 i 开始，从底至顶堆化 */
  siftUp(i: number): void {
    while (true) {
      // 获取节点 i 的父节点
      const p = this.parent(i)
      // 当“越过根节点”或“节点无须修复”时，结束堆化
      if (p < 0 || this.maxHeap[i] <= this.maxHeap[p]) break
      // 交换两节点
      this.swap(i, p)
      // 循环向上堆化
      i = p
    }
  }
}
