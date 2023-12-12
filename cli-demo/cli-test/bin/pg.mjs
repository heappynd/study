import readline from 'readline'

const rL = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rL.question('your name: ', (answer) => {
  console.log(answer)

  rL.close()
})
