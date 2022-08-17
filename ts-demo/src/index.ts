function sumVariadic(...args: number[]): number {
  return args.reduce((total, n) => total + n, 0)
}

sumVariadic(1, 2, 3)

function fancyDate(this: Date) {
  return this.getDate()
}

fancyDate.call(new Date())
