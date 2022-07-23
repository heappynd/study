import { effect } from './effect'
import { reactive, readonly, shallowReactive, shallowReadonly } from './reactive'
import { watch } from './watch'

const arr = reactive([])

effect(() => {
  arr.push(1)
})

effect(() => {
  arr.push(1)
})

setTimeout(() => {}, 1000)
