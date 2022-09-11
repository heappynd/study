import express from 'express'
import { isLogin } from '../middleware/index.js'
import UserModel from '../model/UserModel.js'

const router = express.Router()

router.post('/login', (req, res) => {
  const { username, password } = req.body
  UserModel.findOne({ username, password }).then((data) => {
    console.log(data)
    if (!data) {
      res.send({ code: -1, message: 'login fail' })
    } else {
      req.session.userId = data._id
      res.send({ code: 1, message: 'login success' })
    }
  })
})
router.post('/logout', [isLogin], (req, res) => {
  req.session.destroy(() => {
    res.send({ code: 1, message: 'logout ok' })
  })
})

export default router
