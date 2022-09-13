import express from 'express'
import jwt from 'jsonwebtoken'

const app = express()

const jwtPrivateKey = 'shhhhhh'

app.use(express.json())

app.post('/login', (req, res) => {
  const { username, password } = req.body
  if (username === 'lisi' && password === '123456') {
    jwt.sign({ username }, jwtPrivateKey, { expiresIn: '1d' }, (err, token) => {
      res.send({
        code: 1,
        message: '登录成功',
        data: token,
      })
    })
  } else {
    res.send({
      code: -1,
      message: '登录失败',
    })
  }
})

app.get('/test', (req, res) => {
  const headers = req.headers
  const token = headers['authorization']?.split(' ')?.[1]
  jwt.verify(token, jwtPrivateKey, (err, payload) => {
    if (err) {
      res.status(403).send({
        code: -1,
        message: '没有权限',
      })
    } else {
      res.send({
        code: 1,
        data: payload,
      })
    }
  })
})

app.listen(3000, () => {
  console.log('ok')
})
