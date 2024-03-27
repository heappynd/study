import { WebSocketServer } from 'ws'

const wss = new WebSocketServer({ port: 3000 })

wss.on('connection', (ws) => {
  console.log('Client connected')

  ws.on('message', (message) => {
    console.log(`Received message:`, message, message.toJSON())
    // message.toString()
    // 处理客户端发送的消息
    // ws.send(`Server received: ${message}`)
    if (message.toJSON().data[0] === 13) {
      ws.send('ok\n')
    } else {
      ws.send(message)
    }
  })

  // setInterval(() => {
  //   ws.send('Hello from server!' + new Date().toLocaleString())
  // }, 3000)

  ws.on('close', () => {
    console.log('Client disconnected')
  })
})
