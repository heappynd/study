class RecentCounter {
  requests: number[]

  constructor() {
    this.requests = []
  }

  ping(t: number): number {
    const start = t - 3000
    this.requests.push(t)
    while (start > this.requests[0]) {
      this.requests.shift()
    }
    return this.requests.length
  }
}

/**
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter()
 * var param_1 = obj.ping(t)
 */

const obj = new RecentCounter()
obj.ping(642)
obj.ping(1849)
obj.ping(4921)
obj.ping(5936)
obj.ping(5957)
