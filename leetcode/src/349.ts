// 349 两个数组的交集
function intersection(nums1: number[], nums2: number[]): number[] {
  return [...new Set(nums1)].filter((item) => nums2.includes(item))
}

function intersection2(nums1: number[], nums2: number[]): number[] {
  const map = new Map()
  nums1.forEach((n) => {
    map.set(n, true)
  })
  const res: number[] = []
  nums2.forEach((n) => {
    if (map.get(n)) {
      res.push(n)
      map.delete(n)
    }
  })
  return res
}
