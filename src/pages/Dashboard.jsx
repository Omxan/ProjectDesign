import React, { useState, useEffect } from "react";
import SensorCard from "../components/SensorCard";
import SensorChart from "../components/SensorChart";
import { getLiveReadings } from "../utils/api";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [startTime] = useState(new Date());

  // Fetch sensor data periodically (mock for now)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getLiveReadings();
        setData(result);

        const now = new Date();
        setChartData((prev) => {
          const updated = [
            ...prev,
            {
              time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              co2: result.co2,
              vocs: result.vocs,
              humidity: result.rh,
              temp: result.temp,
            },
          ];

          // Keep only last 5 minutes of data
          const fiveMinAgo = new Date(now.getTime() - 5 * 60 * 1000);
          return updated.filter((d) => {
            const dTime = new Date(`${startTime.toDateString()} ${d.time}`);
            return dTime >= fiveMinAgo;
          });
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // update every 5 sec
    return () => clearInterval(interval);
  }, [startTime]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      {/* Top cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <SensorCard label="CO₂" value={data ? `${data.co2} ppm` : "Loading..."} />
        <SensorCard label="VOCs" value={data ? `${data.vocs} ppb` : "Loading..."} />
        <SensorCard label="Humidity" value={data ? `${data.rh}%` : "Loading..."} />
        <SensorCard label="Temperature" value={data ? `${data.temp} °C` : "Loading..."} />
      </div>

      {/* Chart */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">Sensor Trends (Mock Mode)</h2>
        <p className="text-sm text-orange-500 mb-3">
          ⚠ Running in mock mode — live data will appear once backend is connected.
        </p>
        <SensorChart data={chartData} />
      </div>
    </div>
  );
}
