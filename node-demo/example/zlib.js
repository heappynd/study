import zlib from 'node:zlib'
import fs from 'node:fs'
import http from 'http'

const gzip = zlib.createGzip()

http
  .createServer((req, res) => {
    const rstream = fs.createReadStream('./package.json')

    res.writeHead(200, {
      'Content-Type': 'application/x-javascript;charset=utf-8',
      'Content-Encoding': 'gzip',
    })

    rstream.pipe(gzip).pipe(res)
  })
  .listen(3000, () => {
    console.log('ok')
  })
