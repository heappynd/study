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
