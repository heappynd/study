import { App, createApp } from 'vue'
import app from './App.vue'
import {
  renderWithQiankun,
  qiankunWindow,
} from 'vite-plugin-qiankun/dist/helper'

let root: App

function render(props: any) {
  const { container } = props
  root = createApp(app)
  const c = container
    ? container.querySelector('#app')
    : document.getElementById('app')
  root.mount(c)
}

// some code
renderWithQiankun({
  bootstrap() {
    console.log('bootstrap')
  },
  mount(props) {
    props.onGlobalStateChange((state, prev) => {
      // state: 变更后的状态; prev 变更前的状态
      console.log('sub-c', state, prev)
    })
    // props.setGlobalState({a: 1});
    console.log('vue3sub mount', props)
    render(props)
  },

  unmount(props) {
    console.log('vue3sub unmount')
    root.unmount()
  },
  update(props) {
    console.log('vue3sub update')
    console.log(props)
  },
})

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({})
}
