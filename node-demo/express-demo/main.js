import express from 'express'
import { userRouter } from './express-demo/router/user.js'

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(express.static('static'))

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
  res.send('<h1>111</h1>')
})

app.get('/music/:id', [hasAuth], (req, res) => {
  res.send({ id: req.params.id })
})

app.listen(3000, () => {
  console.log('ok')
})
