import { useEffect, useRef } from "react";
import generateCandlesData from "@devexperts/dxcharts-lite/dist/chart/utils/candles-generator.utils";
import { createChart } from "@devexperts/dxcharts-lite";
interface ChartInstance {
    setData: (data: any) => void;
    destroy: () => void;
  }
const TredingChart = () => {
   // Type chartRef as a reference to an HTMLDivElement
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let chartInstance: ChartInstance | null = null;
  
    if (chartRef.current) {
      // Create chart instance (assuming createChart returns an object with setData and destroy methods)
      chartInstance = createChart(chartRef.current);
  
      // Configuration for candles data generation
      const config = {
        interval: '1m',
        from: new Date(Date.now() - 24 * 60 * 60 * 1000),
        to: new Date(),
        candlesCount: 100,
      };
  
      // Generate and set candles data
      const candles = generateCandlesData(config);
      chartInstance.setData({ candles });
    }
  
    // Cleanup function
    return () => {
      if (chartInstance) {
        // Use the destroy method
        if (typeof chartInstance.destroy === 'function') {
          chartInstance.destroy();
        }
      }
    };
  }, [chartRef]);

  return (
    <div
      id="chart_container"
      ref={chartRef}
      style={{ minHeight: "400px", height: "400px", width: "100%" }}
    />
  );
};

export default TredingChart;
