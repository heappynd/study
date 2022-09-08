import { add } from './modules/utils.js'
import http from 'http'
import url from 'url'

console.log(add(1, 2))

http
  .createServer((req, res) => {
    if (req.url === '/favicon.ico') {
      return
    }
    const { pathname, searchParams } = new URL(req.url, `http://localhost:3000`)
    if (pathname === '/api/user') {
      res.end(`${searchParams.get('cb')}({ "name": "andy" })`)
      return
    }
    // res.write('hello world')
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
    res.end(renderHTML(req))
  })
  .listen(3000, () => {
    console.log('server start')
  })

/**
 *
 * @param {http.IncomingMessage} req
 * @returns {string}
 */
function renderHTML(req) {
  return `<h1>${req.method} - ${req.url} - ${req.headers}</h1>`
}