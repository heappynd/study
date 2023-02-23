import { effect } from "./effect";

// watch 函数接收两个参数，source 是响应式数据，cb 是回调函数
export function watch(source, cb) {
  effect(
    // 触发读取操作，从而建立联系
    () => source.foo,
    {
      scheduler() {
        // 当数据变化时，调用回调函数 cb
        cb();
      },
    }
  );
}
