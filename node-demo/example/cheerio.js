import http from 'http'
import https from 'https'
import url, { urlToHttpOptions } from 'url'
import cheerio from 'cheerio'

http
  .createServer((req, res) => {
    if (req.url === '/favicon.ico') {
      return
    }
    const { pathname, searchParams } = new URL(req.url, `http://localhost:3000`)

    httpget().then((str) => {
      res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' })
      const $ = cheerio.load(str)
      const list = []
      $('#nowplaying .list-item').each((index, value) => {
        let text = $(value).find('.stitle .ticket-btn').text()
        text = text.replace(/(\n)/g, '')
        list.push(text.trim())
      })
      console.log(list)
      res.end(list.toString())
    })
  })
  .listen(3000, () => {
    console.log('server start')
  })

function httpget() {
  return new Promise((resolve, reject) => {
    let str = ''
    https.get('https://movie.douban.com/cinema/nowplaying/chengdu/', (res) => {
      res.on('data', (chunk) => {
        str += chunk
      })
      res.on('end', () => {
        resolve(str)
      })
    })
  })
}
