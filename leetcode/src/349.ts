function intersection(nums1: number[], nums2: number[]): number[] {
  return [...new Set(nums1)].filter((item) => nums2.includes(item))
}
