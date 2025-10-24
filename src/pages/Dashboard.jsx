import React, { useState, useEffect } from "react";
import SensorCard from "../components/SensorCard";
import SensorChart from "../components/SensorChart";
import { getLiveReadings, getHistory, setFanSpeed, setAutoMode } from "../utils/api";
import { useUser } from "../context/UserContext";

export default function Dashboard() {
  const { settings } = useUser();
  const [data, setData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [isAuto, setIsAuto] = useState(true);
  const [fanSpeed, setFanSpeedState] = useState(2);

  useEffect(() => {
    let intervalLive, intervalHistory;

    const fetchLive = async () => {
      try {
        const result = await getLiveReadings();
        setData(result);
        setChartData((prev) => {
          if (!result?.timestamp) return prev;
          const exists = prev.some((p) => p.timestamp === result.timestamp);
          if (exists) return prev;
          const newPoint = {
            timestamp: result.timestamp,
            co2: result.co2,
            vocs: result.vocs,
            humidity: result.humidity,
            temperature: result.temperature,
            occupancy: result.occupancy,
          };
          return [...prev, newPoint].slice(-100);
        });
      } catch (err) {
        console.error("Error fetching live data:", err);
      }
    };

    const fetchHistory = async () => {
      try {
        const historyData = await getHistory();
        setChartData(historyData);
      } catch (err) {
        console.error("Error fetching history:", err);
      }
    };

    fetchLive();
    fetchHistory();

    intervalLive = setInterval(fetchLive, 15000);
    intervalHistory = setInterval(fetchHistory, 15000);

    return () => {
      clearInterval(intervalLive);
      clearInterval(intervalHistory);
    };
  }, []);

  const handleFanSpeed = async (speed) => {
    setFanSpeedState(speed);
    setIsAuto(false);
    try {
      await setFanSpeed(speed);
    } catch (err) {
      console.error("Error setting fan speed:", err);
    }
  };

  const toggleAuto = async () => {
    const newMode = !isAuto;
    setIsAuto(newMode);
    try {
      await setAutoMode(newMode);
    } catch (err) {
      console.error("Error toggling auto mode:", err);
    }
  };

  const thresholds = {
    co2: Number(settings?.co2Threshold) || 800,
    vocs: Number(settings?.vocThreshold) || 250,
    humidityRange: settings?.humidityRange || "40-60",
    temperatureRange: settings?.temperatureRange || "22-28",
  };

  const [humidityMin, humidityMax] = thresholds.humidityRange
    .split("-")
    .map((n) => Number(n.trim()));
  const [tempMin, tempMax] = thresholds.temperatureRange
    .split("-")
    .map((n) => Number(n.trim()));

  const getStatusColor = (value, key) => {
    if (value === undefined || value === null) return "bg-white text-gray-600";
    switch (key) {
      case "co2":
        return value <= thresholds.co2
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700";
      case "vocs":
        return value <= thresholds.vocs
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700";
      case "humidity":
        return value >= humidityMin && value <= humidityMax
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700";
      case "temperature":
        return value >= tempMin && value <= tempMax
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700";
      default:
        return "bg-white text-gray-700";
    }
  };

  const determineAirQuality = (co2, vocs) => {
    if (co2 < 450 && vocs < 100) return "Excellent";
    if (co2 < 700 && vocs < 200) return "Good";
    if (co2 < 1000 && vocs < 300) return "Moderate";
    return "Poor";
  };

  const airQuality = data ? determineAirQuality(data.co2, data.vocs) : "Loading...";

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <SensorCard
          label="CO₂"
          value={data ? `${data.co2.toFixed(2)} ppm` : "Loading..."}
          className={getStatusColor(data?.co2, "co2")}
        />
        <SensorCard
          label="VOCs"
          value={data ? `${data.vocs.toFixed(2)} ppb` : "Loading..."}
          className={getStatusColor(data?.vocs, "vocs")}
        />
        <SensorCard
          label="Humidity"
          value={data ? `${data.humidity.toFixed(2)}%` : "Loading..."}
          className={getStatusColor(data?.humidity, "humidity")}
        />
        <SensorCard
          label="Temperature"
          value={data ? `${data.temperature.toFixed(2)} °C` : "Loading..."}
          className={getStatusColor(data?.temperature, "temperature")}
        />
        <SensorCard
          label="Occupancy"
          value={data ? `${data.occupancy} people` : "Loading..."}
          className="bg-white text-gray-700"
        />
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Purifier Status</h2>
        <div className="grid grid-cols-3 text-center items-center">
          <div>
            <p className="text-gray-600 font-medium">Mode</p>
            <p className="text-2xl font-bold">{isAuto ? "Auto" : "Manual"}</p>
            <button
              onClick={toggleAuto}
              className={`mt-3 px-4 py-2 rounded text-white font-semibold ${
                isAuto ? "bg-green-500" : "bg-gray-500 hover:bg-gray-600"
              }`}
            >
              {isAuto ? "Auto" : "Switch to Auto"}
            </button>
          </div>

          <div>
            <p className="text-gray-600 font-medium">Fan Speed</p>
            <p className="text-2xl font-bold">{fanSpeed}</p>
            {!isAuto && (
              <div className="flex justify-center gap-2 mt-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    onClick={() => handleFanSpeed(s)}
                    className={`w-8 h-8 rounded-full font-semibold ${
                      fanSpeed === s
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="text-gray-600 font-medium">Air Quality</p>
            <p
              className={`text-2xl font-bold ${
                airQuality === "Excellent"
                  ? "text-green-600"
                  : airQuality === "Good"
                  ? "text-lime-500"
                  : airQuality === "Moderate"
                  ? "text-yellow-500"
                  : "text-red-600"
              }`}
            >
              {airQuality}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">Sensor Trends (Live Updates)</h2>
        <SensorChart data={chartData} />
      </div>
    </div>
  );
}
