import { ref } from '@vue/reactivity'
import { createRenderer } from './renderer/src'
import { options } from './renderer/src/dom'
import { onMounted } from './renderer/src/life-cycle'

// test

// 在创建 renderer 时传入配置项
const renderer = createRenderer(options)

function MyFuncComp(props) {
  return { type: 'h1', children: props.title }
}
MyFuncComp.props = {
  title: String,
}

const oldVNode = {
  type: MyFuncComp,
  props: {},
}

renderer.render(oldVNode, document.querySelector('#app'))

setTimeout(() => {}, 1000)
