import { effect } from './effect'
import { reactive } from './reactive'
import { watch } from './watch'

type Target = Record<'foo', number>

const proxy: Target = reactive({
  foo: 10,
})

effect(() => {
  for (const key in proxy) {
    console.log(key)
  }
})

setTimeout(() => {
  proxy.bar = 200
}, 1000)
