import express from 'express'
import { isLogin } from '../middleware/index.js'
import UserModel from '../model/UserModel.js'
import multer from 'multer'

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

const upload = multer({ dest: 'public/uploads/' })
router.post('/upload', upload.single('avatar'), (req, res) => {
  console.log(req.body, req.file)
  const avatar = req.file ? `/uploads/${req.file.filename}` : '/default.jpeg'
  UserModel.create({
    username: req.body.username,
    age: 0,
    password: '123456',
    avatar,
  }).then(() => {
    res.send({ code: 1, message: 'ok', data: req.body })
  })
})

export default router
