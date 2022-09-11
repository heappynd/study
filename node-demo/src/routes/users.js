import express from 'express'
import UserModel from '../model/UserModel.js'

const router = express.Router()

router.get('/', (req, res) => {
  console.log(req.session.userId)
  const { current, pageSize } = req.query
  UserModel.find({})
    .skip((current - 1) * pageSize)
    .limit(pageSize)
    .then(async (data) => {
      res.send({
        total: await UserModel.find({}).count(),
        data,
      })
    })
})

export default router
