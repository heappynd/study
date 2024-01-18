import Chart from "./components/Chart";
import useTheme from "./hooks/useTheme";

console.log("location", location);

function App() {
  const { theme } = useTheme();

  return (
    <>
      <Chart type="cpu" latest={1} total={4} theme={theme} />
      <Chart type="memory" latest={100} total={512} theme={theme} />
      <Chart type="gpu_memory" latest={100} total={512} theme={theme} />
      <Chart type="gpu_usage" latest={80} theme={theme} />
    </>
  );
}

export default App;
