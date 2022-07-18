import { effect } from './effect'
import { flushJob, jobQueue } from './other'
import { reactive } from './reactive'

type Target = Record<'foo', number>

const proxy: Target = reactive({
  foo: 1,
})

const effectFn = effect(
  () => {
    console.log(proxy.foo)
  },
  {
    lazy: true,
  }
)

// effectFn()

proxy.foo = 2

console.log('end')
