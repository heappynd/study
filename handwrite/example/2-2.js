let a = 1
let b = 2

;[a, b] = [b, a]

console.log('a', a)
console.log('b', b)

a = a + b
b = a - b
a = a - b

console.log('a', a)
console.log('b', b)
