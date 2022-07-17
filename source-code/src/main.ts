import { effect } from './effect'
import { reactive } from './reactive'

type Target = Record<'foo', number>

const proxy: Target = reactive({
  foo: 0,
})

// let temp1, temp2
effect(() => {
  // debugger
  proxy.foo = proxy.foo + 1
})

setTimeout(() => {
  // proxy.bar = false
}, 1000)

setTimeout(() => {}, 2000)
