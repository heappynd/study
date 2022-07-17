import { effect } from './effect'
import { flushJob, jobQueue } from './other'
import { reactive } from './reactive'

type Target = Record<'foo', number>

const proxy: Target = reactive({
  foo: 1,
})

effect(
  () => {
    debugger
    console.log(proxy.foo)
  },
  {
    scheduler(fn) {
      jobQueue.add(fn)
      flushJob()
    },
  }
)

proxy.foo++
proxy.foo++

console.log('end')
