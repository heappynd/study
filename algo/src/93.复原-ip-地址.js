/*
 * @lc app=leetcode.cn id=93 lang=javascript
 *
 * [93] 复原 IP 地址
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {
  const result = []
  const path = [] // 定义全局路径变量

  // 辅助函数，判断给定的段是否是有效的IP地址部分
  function isValid(segment) {
    // 段长度为0或大于3则无效
    // if (segment.length === 0 || segment.length > 3) return false
    // 段长度大于1且以‘0’开头则无效
    if (segment.length > 1 && segment[0] === '0') return false
    // 段转换为整数后不在0到255之间则无效
    const num = parseInt(segment)
    return num >= 0 && num <= 255
  }

  // 回溯函数，从start位置开始尝试生成IP地址段
  function backtrack(start) {
    // 如果路径长度为4且已到达字符串末尾，保存当前路径为有效IP地址
    if (path.length === 4) {
      if (start === s.length) {
        result.push(path.join('.'))
      }
      return
    }

    // 尝试生成长度为1到3的子串
    for (let length = 1; length <= 3; length++) {
      // 如果子串结束位置超出字符串长度，则跳出循环
      if (start + length > s.length) break
      // 获取当前子串
      const segment = s.substring(start, start + length)
      // 如果子串是有效的IP地址段
      if (isValid(segment)) {
        path.push(segment) // 将子串加入路径
        backtrack(start + length) // 递归继续生成后续段
        path.pop() // 回溯，移除最后一个段
      }
    }
  }

  backtrack(0) // 从位置0开始回溯
  return result // 返回所有可能的有效IP地址
}
// @lc code=end
