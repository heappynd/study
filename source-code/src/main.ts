import { effect, ref } from '@vue/reactivity'
import { createRenderer } from './runtime'
import { VNode } from './runtime/vnode'

const bol = ref(false)
const renderer = createRenderer()

effect(() => {
  const vnode: VNode = {
    type: 'div',
    props: bol.value
      ? {
          onClick: () => {
            console.log('ccc')

            alert('父元素 clicked')
          },
          class: 'test',
        }
      : {},
    children: [
      {
        type: 'p',
        props: {
          onClick: () => {
            console.log(1)

            bol.value = true
          },
        },
        children: 'text',
      },
    ],
  }
  console.log(vnode)

  renderer.render(vnode, document.querySelector('#app')!)
})

setTimeout(() => {
  // renderer.render(newVnode, document.getElementById('app')!)
}, 1000)
