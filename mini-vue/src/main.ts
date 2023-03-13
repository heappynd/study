import { ref } from '@vue/reactivity'
import { createRenderer } from './renderer/src'
import { options } from './renderer/src/dom'
import { onMounted } from './renderer/src/life-cycle'

// test

// 在创建 renderer 时传入配置项
const renderer = createRenderer(options)

const Comp = {
  props: {
    foo: String,
  },
  setup(props, setupContext) {
    const { slots, emit, attrs, expose } = setupContext

    onMounted(() => {
      console.log('on', setupContext)
    })

    const count = ref(1000)
    // 返回一个对象，对象中的数据会暴露到渲染函数中
    return {
      count,
    }
  },
  render() {
    return {
      type: 'div',
      children: 'xsda',
    }
  },
}

const oldVNode = {
  type: Comp,
  props: {},
}

renderer.render(oldVNode, document.querySelector('#app'))

setTimeout(() => {
  // const newVNode = {
  //   type: MyComponent,
  //   props: {
  //     title: 'A small',
  //   },
  // }
  // renderer.render(newVNode, document.querySelector('#app'))
}, 1000)
