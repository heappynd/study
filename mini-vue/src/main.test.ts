import { describe, expect, it, vi } from "vitest";
import { effect, obj } from "./main";

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
