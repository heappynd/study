import { describe, expect, it, vi } from "vitest";
import { effect, obj } from "./vue";

describe("basic test", () => {
  it("reactive", () => {
    let dummy: string | undefined = undefined;
    effect(() => {
      dummy = obj.text;
    });
    expect(dummy).toBe("hello vue3");
    obj.text = "hello vue2";
    expect(dummy).toBe("hello vue2");
  });
});

describe("分支切换与 cleanup", () => {
  it("one", () => {
    let dummy: string | undefined = undefined;
    const fn = vi.fn(() => {
      dummy = obj.ok ? obj.text : "not";
    });
    effect(fn);

    obj.ok = false;
    expect(dummy).toBe("not");

    obj.text = "hello world";
    expect(dummy).toBe("not");
    expect(fn).toHaveBeenCalledTimes(2);
  });
});

describe("nested functions", () => {
  it("effect嵌套", () => {
    let temp1, temp2;
    let fn1 = vi.fn(() => {});
    let fn2 = vi.fn(() => {});
    effect(function effectFn1() {
      fn1();

      effect(function effectFn2() {
        fn2();
        // 在 effectFn2 中读取 obj.bar 属性
        temp2 = obj.bar;
      });
      // 在 effectFn1 中读取 obj.foo 属性
      temp1 = obj.foo;
    });

    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn2).toHaveBeenCalledTimes(1);
    obj.foo = false;
    expect(fn1).toHaveBeenCalledTimes(2);
  });
});
