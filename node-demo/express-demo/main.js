import express from 'express'
import { userRouter } from './router/user.js'

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(express.static('static'))

app.set('views', '/Users/he/Documents/code/study/node-demo/express-demo/views')
app.set('view engine', 'ejs')

function hasAuth(req, res, next) {
  const auth = false
  if (auth) {
    next()
  } else {
    res.send('401')
  }
}

app.use('/user', userRouter)

app.get('/', (req, res) => {
  res.send('<h1>index</h1>')
})

app.get('/login', (req, res) => {
  res.render('login', { title: 'cctv' })
})
app.post('/login', (req, res) => {
  const { username } = req.body
  if (username === 'andy') {
    console.log('login success')
    res.redirect('/home')
  } else {
    console.log('login error')
    res.redirect('/login')
  }
})

app.get('/music/:id', [hasAuth], (req, res) => {
  res.send({ id: req.params.id })
})

app.listen(3000, () => {
  console.log('ok')
})
