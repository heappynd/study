import { WebSocketServer } from 'ws'
const wss = new WebSocketServer({ port: 3000 })

wss.on('connection', (ws) => {
  console.log('有人连接进来了')

  ws.on('message', (data) => {
    ws.send(data + ' !cctv!')
  })

  ws.on('close', () => {
    console.log('有人退出了')
  })
})
