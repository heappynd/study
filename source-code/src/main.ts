import { effect } from './effect'
import { reactive, shallowReactive } from './reactive'
import { watch } from './watch'

const obj = shallowReactive({
  foo: {
    bar: 1,
  },
})

effect(() => {
  console.log(obj.foo.bar)
})

setTimeout(() => {
  obj.foo.bar = 200
}, 1000)
