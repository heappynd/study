import fs from 'node:fs'

const stream = fs.createReadStream('./a-test/uns.jpg')

stream.on('data', (chunk) => {
  console.log(chunk)
})
stream.on('end', () => {
  console.log('end')
})

console.log('sync')
