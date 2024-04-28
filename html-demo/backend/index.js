import express from 'express'
import formidableMiddleware from 'express-formidable'

const app = express()

app.use(
  formidableMiddleware({
    uploadDir: './uploads', // 设置上传文件的目录
    keepExtensions: true, // 保留文件的后缀
  })
)

// Used to parse JSON bodies
// app.use(express.json())
// Parse URL-encoded bodies using query-string library
// Parse URL-encoded bodies using qs library if extended: true
// app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/users', (req, res) => {
  // 处理用户注册逻辑
  console.log('req.fields', req.fields)
  res.send('User registered successfully!')
})

app.post('/api/upload', (req, res) => {
  // 处理文件上传逻辑
  console.log('req.files', req.files)
  console.log('req.fields', req.fields)
  res.send('File uploaded successfully!')
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
