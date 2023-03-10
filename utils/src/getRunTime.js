/**
 * @description 根据开始时间计算出已运行时间
 * @param {string} startTime 2023-03-10T09:53:23+08:00
 * @param {string} endTime 2023-03-10T09:53:23+08:00
 * @param {boolean} isRunning 是否运行状态
 */
export function getRunTime(startTime, endTime, isRunning = false) {
  function fun1(startTime) {
    if (!startTime) {
      return null;
    }
    const startDate = new Date(startTime);
    const now = new Date();
    const elapsedMilliseconds = now - startDate;
    const seconds = Math.floor(elapsedMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const elapsed = {
      days,
      hours: hours % 24,
      minutes: minutes % 60,
      seconds: seconds % 60,
      milliseconds: elapsedMilliseconds % 1000,
    };

    return elapsed;
  }

  function fun2(startTime, endTime) {
    if (!startTime || !endTime) {
      return null;
    }
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
    const diff = end - start;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    const milliseconds = diff % 1000;

    return {
      days,
      hours,
      minutes,
      seconds,
      milliseconds,
    };
  }

  return isRunning ? fun1(startTime) : fun2(startTime, endTime);
}

export function getFormatTime(runTime) {
  if (!runTime) {
    return "-";
  }
  const { days, hours, minutes, seconds } = runTime;
  let res = "";
  days > 0 && (res += `${days}d`);
  hours > 0 && (res += `${hours}h`);
  minutes > 0 && (res += `${minutes}m`);
  res += `${seconds}s`;
  return res;
}
