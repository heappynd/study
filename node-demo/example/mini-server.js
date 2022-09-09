import fs from 'node:fs'
import http from 'node:http'

/**
 *
 * @param {http.ServerResponse} res
 * @param {*} data
 * @param {*} type
 */
function render(res, data, type = '') {
  res.writeHead(200, { 'Content-Type': type ? type : 'application/json' })
  res.end(data)
}

const pageRouter = {
  '/': (req, res) => {
    const data = fs.readFileSync('./index.html')
    render(res, data, 'text/html;charset=utf-8')
  },
  '/404': (req, res) => {
    const data = `<h1>404</h1>`
    render(res, data, 'text/html;charset=utf-8')
  },
}
const apiRouter = {
  '/api/login': (req, res) => {
    const { searchParams } = new URL(req.url, 'http://localhost:3000')
    render(
      res,
      JSON.stringify({
        username: searchParams.get('username'),
      })
    )
  },
  '/api/post': (req, res) => {
    let chunks = ''
    req.on('data', (chunk) => (chunks += chunk))
    req.on('end', () => {
      render(
        res,
        JSON.stringify({
          password: JSON.parse(chunks).password,
        })
      )
    })
  },
}

function server() {
  let Router = {}
  const serve = http.createServer((req, res) => {
    const { pathname } = new URL(req.url, 'http://localhost:3000')
    try {
      Router[pathname](req, res)
    } catch (error) {
      Router['/404'](req, res)
    }
  })

  return {
    start() {
      serve.listen(3000, () => {
        console.log('ok')
      })
    },
    use(router) {
      Router = { ...Router, ...router }
    },
  }
}
const s = server()
s.use(pageRouter)
s.use(apiRouter)
s.start()
