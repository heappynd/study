import { effect } from './effect'
import { reactive } from './reactive'

type Target = Record<'foo' | 'bar', boolean>

const proxy: Target = reactive({
  foo: true,
  bar: true,
})

let temp1, temp2
effect(() => {
  console.log('effect1 run')

  effect(() => {
    console.log('effect2 run')
    temp2 = proxy.bar
  })

  temp1 = proxy.foo
})

setTimeout(() => {
  proxy.bar = false
}, 1000)

setTimeout(() => {}, 2000)
