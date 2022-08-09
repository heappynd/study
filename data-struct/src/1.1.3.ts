// 多项式 阶数 系数 定点x
function f1(n: number, a: number[], x: number) {
  let p = a[0]
  for (let i = 0; i <= n; i++) {
    p += a[i] * Math.pow(x, i)
  }
  return p
}

function f2(n: number, a: number[], x: number) {
  let p = a[n]
  for (let i = n; i > 0; i--) {
    p = a[i - 1] + x * p
  }
  return p
}
const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

console.time('f1')
for (let i = 0; i < 100000; i++) {
  f1(9, a, 1.1)
}
console.timeEnd('f1')

console.time('f2')
for (let i = 0; i < 100000; i++) {
  f2(9, a, 1.1)
}
console.timeEnd('f2')

// 解决问题的效率 跟算法的巧妙度有关
