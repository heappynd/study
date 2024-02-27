class Pair {
  key: number
  val: string
  constructor(key: number, val: string) {
    this.key = key
    this.val = val
  }
}

class ArrayHashMap {
  private readonly buckets: (Pair | null)[]
  constructor() {
    this.buckets = new Array(100).fill(null)
  }

  private hashFunc(key: number) {
    return key % 100
  }

  get(key: number) {
    let index = this.hashFunc(key)
    let pair = this.buckets[index]
    if (pair === null) return null
    return pair.val
  }

  set(key: number, val: string) {
    let index = this.hashFunc(key)
    this.buckets[index] = new Pair(key, val)
  }

  delete(key: number) {
    let index = this.hashFunc(key)
    // 置为 null ，代表删除
    this.buckets[index] = null
  }

  entries(): (Pair | null)[] {
    let arr: (Pair | null)[] = []
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        arr.push(this.buckets[i])
      }
    }
    return arr
  }
}
