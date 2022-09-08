import fs from 'node:fs/promises'

const handler = {
  success(data) {
    if (data) {
      console.log(data)
    } else {
      console.log('操作成功')
    }
  },
  error(err) {
    if (err.code === 'ENOENT') {
      console.log('文件或文件夹不存在')
    }
    console.log('操作失败', err)
  },
}

// fs.mkdir('test')

// fs.rename('test', 'test1')

// fs.rmdir('test1')

// fs.writeFile('./test/a.txt', '你哈收到啦')

// fs.appendFile('./test/a.txt', '啊沙发撒的发生 \n')

// fs.readFile('./test/a.txt', 'utf-8')

// fs.unlink('./test/a.txt')

// fs.rm('./test', { recursive: true })

// @return []
// fs.readdir('./test')

for (let i = 0; i < 10; i++) {
  fs.writeFile(`./logs/log-${i}.txt`, `${i}`)
}

fs.stat('./test')
  .then((data) => {
    console.log(data.isDirectory())
    console.log(data.isFile())
  })
  .catch(handler.error)
