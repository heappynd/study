import ora, { oraPromise } from 'ora'

// const spinner = ora('Loading').start()

// let percent = 0

// spinner.color = 'red'
// spinner.prefixText = 'Downloading chalk: '
// spinner.text = 'Loading ' + percent + '%'

// let task = setInterval(() => {
//   percent += 10
//   spinner.text = 'Loading ' + percent + '%'
//   if (percent === 100) {
//     spinner.stop()
//     spinner.succeed('Download finish!')
//     clearInterval(task)
//   }
// }, 500)
;(async function () {
  const promise = new Promise((resolve, reject) => {
    console.log('doing something...')
    setTimeout(() => {
      resolve()
    }, 3000)
  })
  await oraPromise(promise, {
    successText: 'success!',
    failText: 'failed!',
    prefixText: 'Download ora: ',
    text: 'Loading',
    spinner: {
      interval: 80,
      frames: ['-', '+', '-'],
    },
  })
})()
