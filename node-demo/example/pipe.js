import fs from 'node:fs'

const rstream = fs.createReadStream('./a-test/uns.jpg', 'utf-8')
const wstream = fs.createWriteStream('./a-test/a', 'utf-8')

rstream.pipe(wstream)
