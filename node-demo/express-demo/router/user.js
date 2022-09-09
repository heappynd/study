import express from 'express'

const router = express.Router()

router.get('/user', (req, res) => {
  res.send('get user')
})

router.post('/user', (req, res) => {
  console.log(req.body)
  res.send('post user')
})

export const userRouter = router
