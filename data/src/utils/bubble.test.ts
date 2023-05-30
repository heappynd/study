import { describe, expect, it } from "vitest";
import { bubbleSort1, bubbleSort2 } from "./bubble";

describe("bubble", () => {
  it("bubble 1", () => {
    console.time("bubble 1");
    const list = [5, 2, 3, 4, 1];
    bubbleSort1(list);
    console.timeEnd("bubble 1");
    expect(list).toEqual([1, 2, 3, 4, 5]);
  });
  it("bubble 2", () => {
    console.time("bubble 2");
    const list = [5, 2, 3, 4, 1];
    bubbleSort2(list);
    console.timeEnd("bubble 2");
    expect(list).toEqual([1, 2, 3, 4, 5]);
  });
});
