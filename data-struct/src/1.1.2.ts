export const x = 0

function printN(n: number) {
  for (let i = 1; i <= n; i++) {
    console.log(i)
  }
}

function printN2(n: number) {
  if (n !== 0) {
    printN2(n - 1)
    console.log(n)
  }
  return
}

console.time('for')
printN(100000)
console.timeEnd('for')

// 解决问题的效率 也跟空间利用的效率有关
console.time('rec')
printN2(100000)
console.timeEnd('rec')
