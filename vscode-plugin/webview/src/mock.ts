const data: { date: string; use: number }[] = [
  { date: "15:29:00", use: 0 },
  { date: "15:30:00", use: 20 },
  { date: "15:31:00", use: 30 },
  { date: "15:32:00", use: 40 },
];

export function getData() {
  data.push({
    date:
      new Date().getHours() +
      ":" +
      new Date().getMinutes() +
      ":" +
      new Date().getSeconds(),
    // 获取 1-100随机数
    // use: Math.floor(Math.random() * 100) + 1,
    use: data.length,
  });
  return Promise.resolve([...data]);
}
