// import { effect, ref } from '@vue/reactivity'
import type { VNode } from './runtime-dom'
import { createRenderer } from './runtime-dom'
import { normalizeClass } from '@vue/shared'

const renderer = createRenderer()

const vnode: VNode = {
  type: 'div',
  props: {
    id: 'foo',
  },
  children: [
    {
      type: 'p',
      children: 'hello',
    },
    {
      type: 'button',
      props: {
        disabled: false,
        class: normalizeClass([
          'foo bar',
          {
            baz: true,
          },
        ]),
        onClick: () => {
          console.log('clicked')
        },
        onMouseover: () => {
          console.log('onMouseover')
        },
      },
      children: 'button',
    },
    {
      type: 'input',
      props: {
        form: 'form1',
      },
    },
  ],
}

renderer.render(vnode, document.querySelector('#app')!)

setTimeout(() => {
  const newVnode = {
    type: 'div',
    children: 'newVnode',
  }
  renderer.render(newVnode, document.querySelector('#app')!)
}, 1000)
