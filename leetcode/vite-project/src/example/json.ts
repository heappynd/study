const json = {
  a: { b: { c: 1 } },
  d: [1, 2],
}

const dfs = (n: any, path: any[]) => {
  console.log(n, path)
  Object.keys(n).forEach((key) => {
    dfs(n[key], path.concat(key))
  })
}

dfs(json, [])
