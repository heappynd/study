import fs from 'node:fs'

const stream = fs.createWriteStream('./a-test/a.txt', 'utf-8')

stream.write('111111111111')
stream.write('222222222222222')

stream.end(() => {
  console.log('end')
})
console.log('sync')
