import { computed } from './computed'
import { reactive } from './reactive'

type Target = Record<'foo', number>

const proxy: Target = reactive({
  foo: 10,
})

const doubleFoo = computed(() => {
  debugger
  return proxy.foo * 3
})

console.log(doubleFoo.value)
console.log(doubleFoo.value)
console.log(doubleFoo.value)

proxy.foo = 100

console.log(doubleFoo.value)

console.log('end')
