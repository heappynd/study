function red() {
  console.log('red')
}
function green() {
  console.log('green')
}
function yellow() {
  console.log('yellow')
}
// 红灯 3s 亮一次，绿灯 1s 亮一次，黄灯 2s 亮一次；如何让三个灯不断交替重复亮灯

// function task(ms, color, cb) {
//   setTimeout(() => {
//     if (color === 'red') {
//       red()
//     } else if (color === 'green') {
//       green()
//     } else if (color === 'yellow') {
//       yellow()
//     }
//     cb()
//   }, ms)
// }

// function all() {
//   task(3000, 'red', () => {
//     task(1000, 'green', () => {
//       task(2000, 'yellow', () => {
//         all()
//       })
//     })
//   })
// }

// all()

function task(ms, color) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (color === 'red') {
        red()
      } else if (color === 'green') {
        green()
      } else if (color === 'yellow') {
        yellow()
      }
      resolve()
    }, ms)
  })
}

// function step() {
//   return task(300, 'red')
//     .then(() => {
//       return task(200, 'green')
//     })
//     .then(() => {
//       return task(100, 'yellow')
//     })
//     .then(() => {
//       return step()
//     })
// }

// step()

async function step() {
  await task(300, 'red')
  await task(200, 'green')
  await task(100, 'yellow')
  await step()
}

step()
