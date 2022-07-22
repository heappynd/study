import { effect } from './effect'
import { reactive } from './reactive'
import { watch } from './watch'

type Target = Record<'foo', number>

const obj = {}
const proto = { bar: 1 }
const child = reactive(obj)
const parent = reactive(proto)
Object.setPrototypeOf(child, parent)

effect(() => {
  console.log(child.bar)
})

setTimeout(() => {
  child.bar = 2
}, 1000)
