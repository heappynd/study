<template>
  <div>
    <h2>WebSocket</h2>

    <h3>status: {{ status }}</h3>
    <h3>data: {{ data }}</h3>

    <button @click="handleSend">send to ws server</button>
  </div>
</template>

<script setup lang="ts">
import { useWebSocket } from '@vueuse/core'

const { status, data, send, open, close } = useWebSocket('ws://localhost:3000', {
  heartbeat: true
})

const handleSend = () => {
  send('Hello Server!' + Date.now())
}

// const ws = new WebSocket('ws://localhost:3000')

// ws.addEventListener('open', () => {
//   console.log('open')
// })

// const send = () => {
//   ws.send('Hello Server!' + Date.now())
// }

// ws.addEventListener('message', (event) => {
//   console.log('Message from server:', event.data)
// })
</script>
