var combine = function (n, k) {
  if (n === 1) {
    return [[1]]
  }
  let ans = []
  let paths = []
  debugger

  function dfs(n, k, startIdx) {
    if (paths.length === k) {
      ans.push(paths.slice())
      return
    }
    for (let i = startIdx; i <= n; i++) {
      paths.push(i)
      dfs(n, k, i + 1)
      paths.pop()
    }
  }

  dfs(n, k, 1)
  return ans
}

console.log(combine(4, 2))
