// import { effect, ref } from '@vue/reactivity'
import type { VNode } from './runtime-dom'
import { createRenderer } from './runtime-dom'
import { normalizeClass } from '@vue/shared'
import { effect, ref } from '@vue/reactivity'

const renderer = createRenderer()

const bol = ref(false)

effect(() => {
  const vnode: VNode = {
    type: 'div',
    props: bol.value
      ? {
          onClick: () => {
            console.log('clicked')
          },
        }
      : {},
    children: [
      {
        type: 'p',
        props: {
          onClick: () => {
            bol.value = true
          },
        },
        children: 'text',
      },
    ],
  }
  renderer.render(vnode, document.querySelector('#app')!)
})

setTimeout(() => {}, 1000)
