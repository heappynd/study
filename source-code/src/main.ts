import { reactive } from './reactive'
import { watch } from './watch'

type Target = Record<'foo', number>

const proxy: Target = reactive({
  foo: 10,
})

let finalData: any
function fetchMock(url: string) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('data1' + url)
    }, 1000)
  })
}

watch(
  () => proxy.foo,
  async (newValue, oldValue, onInvalidate) => {
    let expired = false
    onInvalidate(() => {
      expired = true
    })
    const res = await fetchMock('/api/users' + newValue)
    if (!expired) {
      finalData = res
    }
  },
  {}
)

proxy.foo = 20
setTimeout(() => {
  proxy.foo = 30
}, 200)

setTimeout(() => {
  console.log(finalData)
}, 4000)
