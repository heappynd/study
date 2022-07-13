export { MySet } from './my-set'

const setA = new Set()
const setB = new Set()

console.log(new Set([...setA, ...setB]))

console.log(new Set([...setA].filter((x) => setB.has(x))))

console.log(new Set([...setA].filter((x) => !setB.has(x))))
