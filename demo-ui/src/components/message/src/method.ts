import { createVNode, render } from 'vue'
import MessageConstructor from './message.vue'

const message = (options: { message: string }) => {
  const instance = createMessage(options)

  return instance.handler
}
function createMessage(options: { message: string }) {
  const container = document.createElement('div')

  const props = {
    ...options,
  }

  const vnode = createVNode(MessageConstructor, props, null)

  render(vnode, container)

  console.dir(container)

  document.body.appendChild(container.firstElementChild!)

  const vm = vnode.component!

  const handler = {
    close() {
      vm.exposeProxy!.visible = false
    },
  }

  const instance = {
    vnode,
    vm,
    handler,
  }

  return instance
}

export default message as Message
