import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getRunTime, getFormatTime } from "./getRunTime";

describe("getRunTime test", () => {
  beforeEach(() => {
    // 告诉 vitest 我们使用模拟时间
    vi.useFakeTimers();
  });

  afterEach(() => {
    // 每次测试运行后恢复日期
    vi.useRealTimers();
  });

  it("x", () => {
    // 将时间设置在工作时间之内
    const date = new Date(2023, 2, 10, 10, 5, 55);
    vi.setSystemTime(date);

    const runTime = getRunTime("2023-03-10T10:00:00+08:00", null, true);
    expect(runTime).toEqual({
      days: 0,
      hours: 0,
      minutes: 5,
      seconds: 55,
      milliseconds: 0,
    });
  });

  it("y", () => {
    // 将时间设置在工作时间之内
    const date = new Date(2023, 2, 10, 10, 5, 55);
    vi.setSystemTime(date);

    const runTime = getRunTime("2023-03-10T10:00:00+08:00", null, true);
    expect(runTime).toEqual({
      days: 0,
      hours: 0,
      minutes: 5,
      seconds: 55,
      milliseconds: 0,
    });
  });

  it("z", () => {
    const runTime = getRunTime(
      "2023-03-10T10:00:00+08:00",
      "2023-03-10T11:01:20+08:00",
      false
    );
    expect(runTime).toEqual({
      days: 0,
      hours: 1,
      minutes: 1,
      seconds: 20,
      milliseconds: 0,
    });
  });

  it("startTime null part 1", () => {
    const runTime = getRunTime(null, null, false);
    expect(runTime).toBe(null);
  });

  it("startTime null part 2", () => {
    const runTime = getRunTime(null, null, true);
    expect(runTime).toBe(null);
  });

  it("format part 1", () => {
    const runTime = getRunTime(
      "2023-03-10T10:00:00+08:00",
      "2023-03-10T11:00:20+08:00",
      false
    );
    expect(getFormatTime(runTime)).toBe("1h20s");
  });

  it("format part 2", () => {
    const runTime = getRunTime(null, "2023-03-10T11:00:20+08:00", false);
    expect(getFormatTime(runTime)).toBe("-");
  });

  it("format part 3", () => {
    const runTime = getRunTime(
      "2023-03-10T10:00:00+08:00",
      "2023-03-11T11:20:49+08:00",
      false
    );
    expect(getFormatTime(runTime)).toBe("1d1h20m49s");
  });
});
