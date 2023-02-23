import { reactive, effect, computed, watch } from "./reactivity/src";

const data = { foo: 1 };
const obj = reactive(data);

watch(
  () => obj.foo,
  () => {
    console.log("数据变化了");
  }
);
obj.foo++;
obj.foo++;
