import http from 'node:http'
import url from 'node:url'

const server = http.createServer((request, response) => {
  // console.log('req.method', req.method)
  // console.log('req.url', req.url) // 只包含 url 中的路径与查询字符串
  // console.log('req.httpVersion', req.httpVersion)
  // console.log('req.headers', req.headers.host)
  // let body = ''
  // req.on('data', (chunk) => {
  //   body += chunk
  // })
  // req.on('end', () => {
  //   console.log('body', body)
  //   res.end('Hello HTTP')
  // })
  console.log(request.url)
  let url = new URL(request.url, 'http://localhost')
  // let res = url.parse(request.url, true)
  console.log(url.searchParams)

  response.end('url')
})

server.listen(3000, () => {
  console.log('Listening')
})
