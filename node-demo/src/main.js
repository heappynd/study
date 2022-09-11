import MongoStore from 'connect-mongo'
import express from 'express'
import session from 'express-session'
import { isLogin } from './middleware/index.js'
import systemRouter from './routes/system.js'
import usersRouter from './routes/users.js'
import './conf/db.config.js'

const app = express()

app.use(express.static('public'))

// session
app.use(
  session({
    name: 'test_express_session',
    secret: 'this_is_session',
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 1000,
      secure: false,
    },
    store: MongoStore.create({
      mongoUrl: 'mongodb://127.0.0.1:27017/mysession',
      ttl: 1000 * 60 * 1000,
    }),
  })
)
// json res.body
app.use(express.json())

// routes
app.use('/api/users', [isLogin], usersRouter)
app.use('/api', systemRouter)

app.listen(3000, () => {
  console.log('listen!!!')
})
