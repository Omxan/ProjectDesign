import React, { useState } from "react";
import { useUser } from "../context/UserContext";

export default function Settings() {
  const { settings, setSettings } = useUser();
  const [localSettings, setLocalSettings] = useState(settings);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setSettings(localSettings);
    alert("Settings saved successfully!");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>
      <div className="grid grid-cols-2 gap-4">
        <label>
          CO₂ Threshold (ppm)
          <input
            type="number"
            name="co2Threshold"
            value={localSettings.co2Threshold}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </label>
        <label>
          VOC Threshold (ppb)
          <input
            type="number"
            name="vocThreshold"
            value={localSettings.vocThreshold}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </label>
        <label>
          Ideal Humidity Range (%)
          <input
            type="text"
            name="humidityRange"
            value={localSettings.humidityRange}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </label>
        <label>
          Ideal Temperature Range (°C)
          <input
            type="text"
            name="tempRange"
            value={localSettings.tempRange}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </label>
      </div>
      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Save Settings
      </button>
    </div>
  );
}
