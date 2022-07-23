import { effect } from './effect'
import { reactive, readonly, shallowReactive, shallowReadonly } from './reactive'
import { watch } from './watch'

const obj = shallowReadonly({
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
