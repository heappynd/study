<script setup lang="ts">
import SparkMD5 from 'spark-md5'
import { ref } from 'vue'

// 文件分片 1MB  1024KB 1024 * 1024B
const CHUNK_SIZE = 1024 * 1024
const fileHash = ref('')
const fileName = ref('')

const createChunks = (file: File) => {
  let cur = 0
  let chunks = []
  while (cur < file.size) {
    const blob = file.slice(cur, cur + CHUNK_SIZE)
    chunks.push(blob)
    cur += CHUNK_SIZE
  }
  return chunks
}

const calculateHash = (chunks: Blob[]) => {
  // 1. 第一个和最后一个切片全部参与计算
  // 2. 中间的切片 只计算前面两个字节、中间两个字节、最后两个字节

  return new Promise((resolve, reject) => {
    const targets: Blob[] = []
    const spark = new SparkMD5.ArrayBuffer()
    const fileReader = new FileReader()

    chunks.forEach((chunk, index) => {
      if (index === 0 || index === chunks.length - 1) {
        targets.push(chunk)
      } else {
        targets.push(chunk.slice(0, 2))
        targets.push(chunk.slice(CHUNK_SIZE / 2, CHUNK_SIZE / 2 + 2))
        targets.push(chunk.slice(CHUNK_SIZE - 2, CHUNK_SIZE))
      }
    })

    fileReader.readAsArrayBuffer(new Blob(targets))

    fileReader.onload = (e) => {
      if (e.target) {
        spark.append(e.target.result)
        const hash = spark.end()

        resolve(hash)
      }
    }
  })
}

const controller = new AbortController()

const uploadChunks = async (chunks: Blob[], existChunks: string[]) => {
  // 浏览器并发请求数有限
  const data = chunks.map((chunk, index) => {
    return {
      fileHash: fileHash.value,
      chunkHash: fileHash.value + '-' + index,
      chunk,
    }
  })
  const formDatas = data
    .filter((item) => !existChunks.includes(item.chunkHash))
    .map((item) => {
      const formData = new FormData()
      formData.append('fileHash', item.fileHash)
      formData.append('chunkHash', item.chunkHash)
      formData.append('chunk', item.chunk)
      return formData
    })

  // console.log('formDatas', formDatas)
  // 最大并发请求数
  const max = 6
  let index = 0
  const taskPool = []
  while (index < formDatas.length) {
    const task = fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formDatas[index],
      signal: controller.signal,
    })
    // ????
    // taskPool.splice(taskPool.findIndex((item) => item === task))

    taskPool.push(task)

    // if (taskPool.length === max) {
    //   await Promise.race(taskPool)
    // }

    index++
  }

  await Promise.all(taskPool)
}

const mergeRequest = () => {
  fetch('http://localhost:3000/merge', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fileHash: fileHash.value,
      fileName: fileName.value,
      size: CHUNK_SIZE,
    }),
  }).then(() => {
    console.log('合并成功了')
  })
}

const vertify = () => {
  return fetch('http://localhost:3000/vertify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fileHash: fileHash.value,
      fileName: fileName.value,
    }),
  })
    .then((res) => res.json())
    .then((res) => res)
}

const handleUpload = async (e: Event) => {
  // console.log((e.target as HTMLInputElement).files)

  const files = (e.target as HTMLInputElement).files
  if (!files) {
    return
  }
  fileName.value = files[0].name
  // console.log(files[0].name)
  // console.log(files[0].size)
  const chunks = createChunks(files[0])
  console.log('chunks', chunks)
  const hash = await calculateHash(chunks)
  console.log('hash', hash)
  fileHash.value = hash as string

  // 校验hash值， 服务器有这个文件就不要上传了
  const data = await vertify()
  if (data.data.shouldUpdate) {
    console.log('需要上传')
    await uploadChunks(chunks, data.data.existChunks)

    mergeRequest()
  } else {
    console.log('不需要上传, 秒传成功')
  }
}

const abort = () => {
  controller.abort()
}
</script>

<template>
  <div>
    <h1>大文件上传</h1>
    <button @click="abort">abort</button>
    <input type="file" @change="handleUpload" />
  </div>
</template>

<style scoped></style>
