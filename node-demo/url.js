import url, { fileURLToPath } from 'url'

function resolve(from, to) {
  const resolvedUrl = new URL(to, new URL(from, 'resolve://'))
  if (resolvedUrl.protocol === 'resolve:') {
    // `from` is a relative URL.
    const { pathname, search, hash } = resolvedUrl
    return pathname + search + hash
  }
  return resolvedUrl.toString()
}

console.log(url.resolve('/a/b/c', 'd'))
console.log(resolve('/a/b/c', 'd'))

console.log(url.resolve('http://www.qq.com/ddd', '/ccc'))
console.log(resolve('http://www.qq.com/ddd', '/ccc'))

const u = new URL('/api/list?q=123', 'http://localhost:3000')
console.log(u)

console.log(u.searchParams.get('q'))

console.log(new URL('file:///C:/path/').pathname) // Incorrect: /C:/path/
console.log(fileURLToPath('file:///C:/path/')) // Correct:   C:\path\ (Windows)
