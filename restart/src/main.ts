export {}

// let num = 0
// outermost: for (let i = 0; i < 10; i++) {
//   for (let j = 0; j < 10; j++) {
//     if (i == 5 && j == 5) {
//       break outermost
//     }
//     num++
//   }
// }
// console.log(num) // 55

// with (location) {
//   let qs = search
// }

let num = 25
switch (true) {
  case num < 0:
    console.log('Less than 0.')
    break
  case num >= 0 && num <= 10:
    console.log('Between 0 and 10.')
    break
  case num > 10 && num <= 20:
    console.log('Between 10 and 20.')
    break
  default:
    console.log('More than 20.')
}
