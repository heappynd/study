type StringNumberPair = [string, number]

interface StringNumberPair1 {
  // specialized properties
  length: 2
  0: string
  1: number

  // Other 'Array<string | number>' members...
  slice(start?: number, end?: number): Array<string | number>
}
type Either2dOr3d = [number, number, number?]

type StringNumberBooleans = [string, number, ...boolean[]]
type StringBooleansNumber = [string, ...boolean[], number]
type BooleansStringNumber = [...boolean[], string, number]

// why useful
function readButtonInput(...args: [string, number, ...boolean[]]) {
  const [name, version, ...input] = args
  // ...
}
function readButtonInput1(name: string, version: number, ...input: boolean[]) {
  // ...
}
// 当您想用一个rest参数获取数量可变的参数，
// 并且需要最少数量的元素，但又不想引入中间变量时，这很方便。

// [1,2] as const -->   readonly [1,2]
