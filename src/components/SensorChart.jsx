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
    return (
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="co2" stroke="#2563eb" name="CO₂ (ppm)" dot={false} />
            <Line type="monotone" dataKey="vocs" stroke="#16a34a" name="VOCs (ppb)" dot={false} />
            <Line type="monotone" dataKey="humidity" stroke="#0ea5e9" name="Humidity (%)" dot={false} />
            <Line type="monotone" dataKey="temp" stroke="#f59e0b" name="Temperature (°C)" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
  