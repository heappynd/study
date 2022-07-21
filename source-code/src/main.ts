import { effect } from './effect'
import { reactive } from './reactive'
import { watch } from './watch'

type Target = Record<'foo' | 'bar', number>

const proxy: Target = reactive({
  foo: 10,

  get bar() {
    return this.foo
  },
})

effect(() => {
  console.log(proxy.bar)
})

setTimeout(() => {
  proxy.foo = 20
}, 1000)
