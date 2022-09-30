export {}

let a = 6
let b = 9
function simpleTag(strings, ...expressions) {
  console.log(strings)
  console.log(expressions)
  for (const rawString of strings.raw) {
    console.log(rawString)
  }
  return (
    strings[0] + expressions.map((e, i) => `${e}${strings[i + 1]}`).join('')
  )
}
let untaggedResult = `${a}+${b}=${a + b}`
let taggedResult = simpleTag`\u00A9   ${a}+${b}=${a + b}`

console.log('untaggedResult', untaggedResult)

console.log('taggedResult', taggedResult)

console.log(String.raw`a\b\r\tb`)

// ----------------\

export {}

let myBoolean = new Boolean()

console.log(myBoolean)

let mySymbol = Symbol('theme')

console.log(mySymbol === Symbol('theme'))

let sym = Symbol.for('locale')
console.log(sym === Symbol.for('locale'))

if (true) {
  let isym = Symbol.for('locale')
  console.log(sym === isym)

  console.log(Symbol.keyFor(isym))
}

let o = {
  a: 1,
  b: 2,
  // [Symbol.asyncIterator]
}

Object.defineProperty(o, mySymbol, { value: 1 })

console.log(o)

console.log(Object.getOwnPropertyNames(o))
console.log(Object.getOwnPropertySymbols(o))
console.log(Object.getOwnPropertyDescriptors(o))
console.log(Reflect.ownKeys(o))

// for (const iterator of o) {
//   console.log(iterator)
// }

// function Foo() {}
// let f = new Foo()
// console.log(Foo[Symbol.hasInstance](f)) // true
