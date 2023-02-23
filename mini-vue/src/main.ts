import { reactive, effect, computed } from "./reactivity/src";

const data = { foo: 1, bar: 2 };
const obj = reactive(data);

const sumRes = computed(() => obj.foo + obj.bar);

console.log(sumRes.value);
