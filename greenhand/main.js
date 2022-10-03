let d = new Date()

console.log(d)

console.log(Date.parse('1/1/1970'))

console.log(new Date(Date.UTC(2022, 9)))

console.log(new Date(2022, 9))

console.log(new Date().toLocaleString())
console.log(new Date().toString())
console.log(new Date().toDateString())
console.log(new Date().toTimeString())
console.log(new Date().toLocaleDateString())
console.log(new Date().toLocaleTimeString())
console.log(new Date().toUTCString())
console.log(new Date().toGMTString())

console.log(new Date().getTimezoneOffset())

console.log('----------')

let pattern1 = /\[bc\]at/i

console.dir(pattern1.valueOf())

console.log(pattern1.global) // false
console.log(pattern1.ignoreCase) // true
console.log(pattern1.multiline) // false
console.log(pattern1.lastIndex) // 0
console.log(pattern1.source) // "\[bc\]at"
console.log(pattern1.flags) // "i"

console.log('----------')
let text = 'cat, bat, sat, fat'
let pattern = /.at/g
let matches = pattern.exec(text)
console.log(matches.index) // 0
console.log(matches[0]) // cat
console.log(pattern.lastIndex) // 3
matches = pattern.exec(text)
console.log(matches) // 5
console.log(pattern.lastIndex) // 8
matches = pattern.exec(text)
console.log(matches.index) // 10
console.log(matches[0]) // sat
console.log(pattern.lastIndex) // 13

''.substring()
''.slice()
