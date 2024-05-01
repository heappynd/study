import { VNode, renderer } from '../renderer'
import { effect, ref } from '@vue/reactivity'

const bol = ref(false)

effect(() => {
  const vnode: VNode = {
    type: 'div',
    props: bol.value
      ? {
          onClick: () => {
            console.log('click')
          },
        }
      : {},
    children: [
      {
        type: 'p',
        props: {
          onClick: () => {
            bol.value = true
            console.log('child click')
          },
        },
        children: 'text',
      },
    ],
  }

  renderer.render(vnode, document.querySelector('#app')!)
})
