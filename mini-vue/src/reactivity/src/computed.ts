import { effect } from "./effect";

export function computed(getter) {
  // 把 getter 作为副作用函数，创建一个 lazy 的 effect
  const effectFn = effect(getter, {
    lazy: true,
  });
  const obj = {
    // 当读取 value 时才执行 effectFn
    get value() {
      return effectFn();
    },
  };
  return obj;
}
