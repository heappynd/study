// import { effect, ref } from '@vue/reactivity'
import type { VNode } from './runtime-dom'
import { createRenderer } from './runtime-dom'
import { normalizeClass } from '@vue/shared'
import { effect, ref } from '@vue/reactivity'
import { onMounted } from './runtime-dom/renderer'

const renderer = createRenderer()

const myComponent = {
  name: 'MyComponent',
  props: {
    title: String,
  },
  data() {
    return {
      foo: 'hello world',
    }
  },
  setup(props, setupContext) {
    console.log(props.title)
    const { slots, emit, attrs, expose } = setupContext

    emit('change', 1, 2)

    onMounted(() => {
      console.log('onMounted vvvv')
    })

    return {
      setupTitle: 'test setup',
    }
  },
  beforeCreate() {
    console.log('beforeCreate')
  },
  created() {
    console.log('created', this)
  },
  beforeMount() {
    console.log('beforeMount')
  },
  mounted() {
    console.log('mounted')
  },
  beforeUpdate() {
    console.log('beforeUpdate')
  },
  updated() {
    console.log('updated')
  },
  render() {
    return {
      type: 'div',
      children: [
        { type: 'header', children: [this.$slots.header()] },
        { type: 'body', children: [this.$slots.body()] },
        { type: 'footer', children: [this.$slots.footer()] },
      ],
    }
  },
}

const vnode: VNode = {
  type: myComponent,
  props: {
    title: 'A big Title',
    onChange: (a, b) => {
      console.log('o(￣ヘ￣o＃) change', a, b)
    },
  },
  children: {
    header() {
      return { type: 'h1', children: '我是标题' }
    },
    body() {
      return { type: 'section', children: '我是内容' }
    },
    footer() {
      return { type: 'p', children: '我是注脚' }
    },
  },
}
renderer.render(vnode, document.querySelector('#app')!)

setTimeout(() => {}, 1000)
