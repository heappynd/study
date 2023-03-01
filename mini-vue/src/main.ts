import { reactive, effect, computed, watch } from './reactivity/src'

const obj = {
  foo: 1,
  get bar() {
    console.log(this);
    
    return this.foo
  }
}

const p = new Proxy(obj, {
  get(target, p, receiver) {
    console.log(target, p, receiver);
    // return target[p]
    return Reflect.get(target, p, receiver)
  },
  set(target, p, newValue, receiver) {
    
  },
})

console.log(p.bar);
