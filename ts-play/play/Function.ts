export {}
// best avoided the type () => void is generally safer.
function doSomething(f: Function) {
  return f(1, 2, 3)
}

const args = [8, 5]
// because TypeScript does not assume that arrays are immutable.
const angle = Math.atan2(...args)

// Inferred as 2-length tuple
const args1 = [8, 5] as const
// OK
const angle1 = Math.atan2(...args1)

function sum({ a, b, c }: { a: number; b: number; c: number }) {
  console.log(a + b + c)
}
// Same as prior example
type ABC = { a: number; b: number; c: number }
function sum1({ a, b, c }: ABC) {
  console.log(a + b + c)
}
