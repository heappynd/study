import { Line } from "@ant-design/plots";
import { useRequest } from "ahooks";
import { FC } from "react";
import { getData } from "../mock";

type ChartProps = {
  type: "cpu" | "memory" | "gpu_usage" | "gpu_memory";
  latest: number;
  total?: number;
  theme: "light" | "dark";
  // data: { date: string; use: number }[];
};

const getMore = (type: ChartProps["type"]) => {
  const units = {
    cpu: "核",
    memory: "GB",
    gpu_usage: "%",
    gpu_memory: "GB",
  };
  const labels = {
    cpu: "CPU",
    memory: "内存",
    gpu_usage: "GPU使用率",
    gpu_memory: "GPU显存",
  };
  return {
    unit: units[type],
    label: labels[type],
  };
};

const Chart: FC<ChartProps> = ({ type, latest, total, theme }) => {
  const unit = getMore(type).unit;
  const label = getMore(type).label;
  const percent = total
    ? ((latest / total) * 100).toFixed(2)
    : latest.toFixed(2);

  // const [data, setData] = useState([]);

  const { data } = useRequest(getData, {
    pollingInterval: 1000 * 60,
  });

  const config = {
    data: data ?? [],
    padding: "auto",
    xField: "date",
    yField: "use",
    xAxis: {
      tickCount: 5,
    },
    smooth: true,
  };

  return (
    <div className="shadow rounded p-4 my-4 overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="dark:text-white">
          {label}({unit})
        </div>
        <div className="dark:text-white">
          {total !== undefined && (
            <span className="text-black/50 dark:text-white/50">
              ({latest}/{total}
              {unit})
            </span>
          )}
          <span>{percent}%</span>
        </div>
      </div>
      <div style={{ height: "240px" }}>
        <Line {...config} theme={theme} />
      </div>
    </div>
  );
};

export default Chart;
