import { effect } from './effect'
import { reactive } from './reactive'

type Target = Record<'foo', number>

const proxy: Target = reactive({
  foo: 0,
})

// let temp1, temp2
effect(
  () => {
    // debugger
    console.log(proxy.foo)
  },
  {
    scheduler(fn) {
      setTimeout(fn)
    },
  }
)

proxy.foo++

console.log('end')
