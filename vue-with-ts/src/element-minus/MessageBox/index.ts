import { App, createApp, watch } from 'vue'
import MessageBoxComponent from './MessageBox.vue'

export const fields = ['confirm', 'prompt']

// Vue.extend
// https://v3-migration.vuejs.org/breaking-changes/global-api.html#vue-extend-removed
const MessageBox = (options) => {
  const messageBoxApp = createApp(MessageBoxComponent, options)

  return new Promise((resolve, reject) => {
    showMessageBox(messageBoxApp, { resolve, reject })
  })
}

fields.forEach((field) => {
  MessageBox[field] = (options) => {
    options.field = field
    return MessageBox(options)
  }
})

function showMessageBox(app: App, { resolve, reject }) {
  const oFragment = document.createDocumentFragment()
  const vm = app.mount(oFragment)
  console.log(vm)

  document.body.appendChild(oFragment)

  vm.setVisible(true)

  watch(vm.state, (state) => {
    if (!state.visible) {
      switch (state.type) {
        case 'cancel':
          reject()
          break
        case 'confirm':
          resolve(state.promptValue)
          break
        default:
          break
      }
      hideMessageBox(app)
    }
  })
}

function hideMessageBox(app: App) {
  app.unmount()
}

export default MessageBox
