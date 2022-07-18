import { computed } from './computed'
import { effect } from './effect'
import { reactive } from './reactive'

type Target = Record<'foo', number>

const proxy: Target = reactive({
  foo: 10,
})

const doubleFoo = computed(() => {
  return proxy.foo * 3
})

effect(() => {
  console.log('-->', doubleFoo.value)
})

proxy.foo = 100

console.log('end')
