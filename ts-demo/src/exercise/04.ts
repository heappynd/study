function sum(a: number, b: number): number {
  return a + b
}

function times(f: (index: number) => void, n: number) {
  for (let i = 0; i < n; i++) {
    f(i)
  }
}

times((n) => {
  console.log(n.toFixed(2))
}, 3)

type Reverse = {
  (from: Date, to: Date, destination: string): void
  (from: Date, destination: string): void
}

let reverse: Reverse = (
  from: Date,
  to: Date | string,
  destination?: string
) => {}

function map<T, U>(array: T[], f: (item: T) => U): U[] {
  let result = []
  for (let i = 0; i < array.length; i++) {
    result.push(f(array[i]))
  }
  return result
}
let m = [1, 2, 3]
map(m, (item) => item.toFixed(2))
