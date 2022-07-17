import { effect } from './effect'
import { reactive } from './reactive'

type Target = Record<string, boolean>

const proxy: Target = reactive({
  foo: true,
  bar: true,
})

effect(() => {
  document.body.innerText = proxy.foo.toString()
})

setTimeout(() => {
  proxy.foo = 'hello'
}, 1000)

setTimeout(() => {}, 2000)
