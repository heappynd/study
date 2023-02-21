import { describe, expect, it } from "vitest";
import { effect, obj } from "./main";

let dummy: string | undefined = undefined;

describe("#sum", () => {
  it("returns 0 with no numbers", () => {
    effect(() => {
      console.log("effect run");

      dummy = obj.ok ? obj.text : "not";
    });

    expect(dummy).toBe("hello vue3");

    obj.ok = false;
    expect(dummy).toBe("not");

    obj.text = "hello world";
    expect(dummy).toBe("not");
  });
});
