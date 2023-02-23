import { reactive, effect, computed, watch } from "./reactivity/src";

const data = { foo: 1 };
const obj = reactive(data);

watch(
  () => obj.foo,
  (newValue, oldValue) => {
    console.log(newValue, oldValue);
    console.log("数据变化了");
  },
  {
    immediate: true,
  }
);
// obj.foo++;
