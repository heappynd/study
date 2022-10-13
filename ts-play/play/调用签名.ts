type GreetFunction = (a: string) => void

type DescribableFunction = {
  description: string
  (someArg: number): boolean
}
function doSomething(fn: DescribableFunction) {
  console.log(fn.description + ' returned ' + fn(6))
}

interface SomeObject {
  readonly id: string
}
// Construct Signatures
type SomeConstructor = {
  new (s: string): SomeObject
}
function fn(ctor: SomeConstructor) {
  return new ctor('12345')
}
export {}
