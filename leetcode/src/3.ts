function lengthOfLongestSubstring(s: string): number {
  let l = 0
  let r = 0
  const map = new Map<string, number>()
  let res = 0
  for (const char of s) {
    if (map.has(char) && map.get(char)! >= l) {
      l = map.get(char)! + 1
    }
    res = Math.max(res, r - l + 1)
    map.set(char, r)
    r++
  }
  return res
}
