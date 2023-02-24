import { reactive, effect, computed, watch } from "./reactivity/src";

const obj = {
  foo: 1,
  get bar() {
    console.log(this);
    
    return this.foo;
  },
};

const p = reactive(obj);

effect(() => {
  console.log(p.bar);
});

p.foo = 100


