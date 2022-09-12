import Koa from 'koa'
import router from './routes/index.js'
import koaStatic from 'koa-static'
import path from 'node:path'
import url from 'node:url'
import bodyParser from 'koa-bodyparser'
import views from 'koa-views'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const app = new Koa()
// console.log(__dirname)

app.use(koaStatic(path.join(__dirname, 'public')))

app.use(bodyParser())

app.use(views(path.join(__dirname, 'views'), { extension: 'ejs' }))

// 应用级组件
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log('ok')
})
