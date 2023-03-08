import { createRenderer } from './renderer/src'
import { ref, effect } from './reactivity/src'
import { options } from './renderer/src/dom'

// test

// 在创建 renderer 时传入配置项
const renderer = createRenderer(options)

const bol = ref(false)
effect(() => {
  const vnode1 = {
    type: 'div',
    props: bol.value
      ? {
          onClick: () => {
            console.log('父元素 clicked')
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

  renderer.render(vnode1, document.querySelector('#app'))
})
