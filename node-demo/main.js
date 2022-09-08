import { add } from './modules/utils.js'
import http from 'http'
import url from 'url'

console.log(add(1, 2))

http
  .createServer((req, res) => {
    if (req.url === '/favicon.ico') {
      return
    }
    console.log(
      url.parse('https://localhost:3000/api/kkk?q=123&a=111/#/home', true)
    )
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
