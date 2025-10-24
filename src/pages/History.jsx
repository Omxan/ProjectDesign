import React, { useEffect, useState } from "react";
import { getHistory } from "../utils/api";

export default function History() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await getHistory();
      setRecords(data.reverse());
    }
    load();
    const interval = setInterval(load, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">History</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">Timestamp</th>
              <th className="px-4 py-2">CO₂ (ppm)</th>
              <th className="px-4 py-2">VOCs (ppb)</th>
              <th className="px-4 py-2">Humidity (%)</th>
              <th className="px-4 py-2">Temperature (°C)</th>
              <th className="px-4 py-2">Occupancy</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, i) => (
              <tr key={i} className="text-center border-t">
                <td className="px-4 py-2">{new Date(r.timestamp).toLocaleTimeString()}</td>
                <td className="px-4 py-2">{r.co2.toFixed(1)}</td>
                <td className="px-4 py-2">{r.vocs.toFixed(1)}</td>
                <td className="px-4 py-2">{r.humidity.toFixed(1)}</td>
                <td className="px-4 py-2">{r.temperature.toFixed(1)}</td>
                <td className="px-4 py-2">{r.occupancy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
