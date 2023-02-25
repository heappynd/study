import { reactive, effect, computed, watch } from './reactivity/src'

const obj = {
  foo: 1,
}

const p = new Proxy(obj, {
  has(target, p) {
    console.log(target, p)
    return Reflect.has(target, p)
  },
})

console.log('foo' in p)
