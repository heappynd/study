import { reactive, effect, computed, watch } from "./reactivity/src";

const data = { foo: 1 };
const obj = reactive(data);


watch(
  obj,
  async (newValue, oldValue, onInvalidate) => {
    let expired = false;
    onInvalidate(()=>{
      expired = true;
    })
    const res = await
  },
  {
    immediate: true,
  }
);
// obj.foo++;
