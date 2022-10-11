function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`)
}

greet('Maddison', new Date())

let num = null // any
// let str: string = undefined

// useful "as const"
declare function handleRequest(url: string, method: 'GET' | 'POST'): void
// const req = { url: 'https://example.com', method: 'GET' as 'GET' }
const req = { url: 'https://example.com', method: 'GET' } as const
handleRequest(req.url, req.method)
// handleRequest(req.url, req.method as 'GET')

// Creating a bigint via the BigInt function
const oneHundred: bigint = BigInt(100)
// Creating a BigInt via the literal syntax
const anotherHundred: bigint = 100n

const firstName = Symbol('name')
const secondName = Symbol('name')
