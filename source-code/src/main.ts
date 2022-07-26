import { createRenderer } from './runtime'
import { VNode } from './runtime/vnode'

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
        disabled: '',
        class: [
          'foo bar',
          {
            baz: true,
          },
        ],
      },
      children: 'ok',
    },
    {
      type: 'input',
      props: {
        form: 'form1',
      },
    },
  ],
}

const renderer = createRenderer()
renderer.render(vnode, document.querySelector('#app')!)
