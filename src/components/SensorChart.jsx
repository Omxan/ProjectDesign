import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function SensorChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-500 p-6">
        No sensor data available yet.
      </div>
    );
  }

  const formattedData = data.map((d) => ({
    ...d,
    time: new Date(d.timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));

  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="co2" stroke="#3b82f6" name="CO₂ (ppm)" dot={false} />
          <Line type="monotone" dataKey="vocs" stroke="#22c55e" name="VOCs (ppb)" dot={false} />
          <Line type="monotone" dataKey="humidity" stroke="#10b981" name="Humidity (%)" dot={false} />
          <Line type="monotone" dataKey="temperature" stroke="#f97316" name="Temperature (°C)" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
