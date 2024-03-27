<template>
  <div>
    <div ref="terminal" class="xxxxxxx"></div>
  </div>
</template>

<script setup lang="ts">
import { Terminal } from '@xterm/xterm'
import '@xterm/xterm/css/xterm.css'
import { onMounted, ref } from 'vue'
import { AttachAddon } from '@xterm/addon-attach'
import { useWebSocket } from '@vueuse/core'
import { CanvasAddon } from '@xterm/addon-canvas'
import { FitAddon } from '@xterm/addon-fit'

const terminal = ref<HTMLDivElement>()

const fitAddon = new FitAddon()

const { status, data, send, open, close, ws } = useWebSocket('ws://localhost:3000', {
  // heartbeat: true,
  onConnected(ws) {
    const term = new Terminal()
    term.loadAddon(
      new AttachAddon(ws, {
        bidirectional: true
      })
    )
    term.loadAddon(new CanvasAddon())
    term.loadAddon(fitAddon)
    term.open(terminal.value!)
    fitAddon.fit()
    // term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
  }
})

onMounted(() => {
  window.addEventListener('resize', () => {
    fitAddon.fit()
  })
})
</script>
