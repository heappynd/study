import http from 'http'
import https from 'https'
import url, { urlToHttpOptions } from 'url'

http
  .createServer((req, res) => {
    if (req.url === '/favicon.ico') {
      return
    }
    const { pathname, searchParams } = new URL(req.url, `http://localhost:3000`)

    httppost().then((str) => {
      res.end(str)
    })

    // res.end('1')
  })
  .listen(3000, () => {
    console.log('server start')
  })

function httpget() {
  return new Promise((resolve, reject) => {
    let str = ''
    https.get('https://jsonplaceholder.typicode.com/posts/1', (res) => {
      res.on('data', (chunk) => {
        str += chunk
      })
      res.on('end', () => {
        resolve(str)
      })
    })
  })
}
function httppost() {
  return new Promise((resolve, reject) => {
    let str = ''

    const req = https.request(
      {
        host: 'jsonplaceholder.typicode.com',
        port: 443,
        path: '/posts',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      (res) => {
        res.on('data', (chunk) => {
          str += chunk
        })
        res.on('end', () => {
          resolve(str)
        })
      }
    )

    req.write('')
    req.end()
  })
}
