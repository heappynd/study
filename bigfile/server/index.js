import express from 'express'
import path from 'node:path'
import multiparty from 'multiparty'
import fse from 'fs-extra'
import cors from 'cors'
import bodyParser from 'body-parser'

const UPLOAD_DIR = path.resolve(import.meta.dirname, 'uploads')

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.post('/upload', (req, res) => {
  const form = new multiparty.Form()

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(401).json({
        ok: false,
        msg: '上传失败，请重新上传',
      })
      return
    }
    // console.log(fields)
    // console.log(files)

    const fileHash = fields['fileHash'][0]
    const chunkHash = fields['chunkHash'][0]
    // 临时存放目录
    const chunkPath = path.resolve(UPLOAD_DIR, fileHash)

    // console.log('chunkPath', chunkPath)

    // 临时存放切片的目录
    if (!fse.existsSync(chunkPath)) {
      await fse.mkdir(chunkPath)
    }

    // 将切片放到这个文件夹里面
    const oldPath = files['chunk'][0]['path']
    console.log('oldPath', oldPath)

    await fse.move(oldPath, path.resolve(chunkPath, chunkHash))

    res.status(200).json({
      ok: true,
      msg: '上传成功',
    })
  })
})

const extractExt = (filename) => {
  return filename.slice(filename.lastIndexOf('.'), filename.length)
}

app.post('/merge', async (req, res) => {
  const { fileHash, fileName, size } = req.body
  console.log(fileHash)

  const ext = extractExt(fileName)

  const filePath = path.resolve(UPLOAD_DIR, fileHash + ext)
  // 如果存在该文件，就不需要真的合并了
  if (fse.existsSync(filePath)) {
    res.status(200).json({
      ok: true,
      msg: '合并成功, 原来就有',
    })
    return
  }

  // 如果不存在该文件
  const chunkDir = path.resolve(UPLOAD_DIR, fileHash)
  if (!fse.existsSync(chunkDir)) {
    res.status(401).json({
      ok: false,
      msg: '合并失败，请重新上传',
    })
    return
  }

  let chunkPaths = await fse.readdir(chunkDir)

  console.log('chunkPaths', chunkPaths)

  chunkPaths.sort((a, b) => {
    return a.split('-')[1] - b.split('-')[1]
  })

  const list = chunkPaths.map((chunkName, index) => {
    return new Promise((resolve, reject) => {
      const chunkPath = path.resolve(chunkDir, chunkName)
      const readStream = fse.createReadStream(chunkPath)
      const writeStream = fse.createWriteStream(filePath, {
        start: index * size,
        // end: (index + 1) * size,
      })
      readStream.pipe(writeStream)

      readStream.on('end', async () => {
        await fse.unlink(chunkPath)
        resolve()
      })
    })
  })

  await Promise.all(list)
  await fse.remove(chunkDir)

  res.status(200).json({
    ok: true,
    msg: '合并成功',
  })
})

app.post('/vertify', async (req, res) => {
  const { fileHash, fileName } = req.body

  const filePath = path.resolve(UPLOAD_DIR, fileHash + extractExt(fileName))

  // 返回服务器上已经上传成功的切片
  const chunkDir = path.resolve(UPLOAD_DIR, fileHash)
  let chunkPaths = []
  // 如果存在临时文件夹，才去读取
  if (fse.existsSync(chunkDir)) {
    chunkPaths = await fse.readdir(chunkDir)
  }

  if (fse.existsSync(filePath)) {
    res.status(200).json({
      ok: true,
      data: {
        shouldUpdate: false,
      },
    })
  } else {
    // 不存在，需要上传
    res.status(200).json({
      ok: true,
      data: {
        shouldUpdate: true,
        existChunks: chunkPaths,
      },
    })
  }
})

app.listen(3000, () => {
  console.log('Server is running on, http://localhost:3000')
})
