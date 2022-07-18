import { computed } from './computed'
import { effect } from './effect'
import { reactive } from './reactive'
import { watch } from './watch'

type Target = Record<'foo', number>

const proxy: Target = reactive({
  foo: 10,
})

watch(
  () => proxy.foo,
  (newValue, oldValue) => {
    console.log('data change', newValue, oldValue)
  }
)

proxy.foo++
