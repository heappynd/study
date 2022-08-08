// import { effect, ref } from '@vue/reactivity'
import type { VNode } from './runtime-dom'
import { createRenderer } from './runtime-dom'
import { normalizeClass } from '@vue/shared'
import { effect, ref } from '@vue/reactivity'

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

    // return () => {
    //   return {
    //     type: 'h1',
    //     children: 'text',
    //   }
    // }
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
      children: `foo: ${this.setupTitle}`,
    }
  },
}

const vnode: VNode = {
  type: myComponent,
  props: {
    title: 'A big Title',
  },
}
renderer.render(vnode, document.querySelector('#app')!)

setTimeout(() => {}, 1000)
