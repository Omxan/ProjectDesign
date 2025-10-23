import React, { useState, useEffect } from "react";

export default function Settings() {
  const [settings, setSettings] = useState({
    facilityName: "",
    areaSize: "",
    roomCount: "",
    refreshRate: 5,
    co2Threshold: 800,
    vocThreshold: 200,
    humidityRange: "40-60",
    temperatureRange: "22-28",
  });

  // Load saved settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("facilitySettings");
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  // Save settings to localStorage
  const handleSave = () => {
    localStorage.setItem("facilitySettings", JSON.stringify(settings));
    alert("✅ Settings saved locally (for now — backend coming soon).");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="bg-white shadow rounded-lg p-6 max-w-3xl">
        <h2 className="text-xl font-semibold mb-4">Facility Parameters</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Facility Name
            </label>
            <input
              type="text"
              className="w-full border rounded-lg p-2"
              placeholder="e.g., Engineering Building"
              value={settings.facilityName}
              onChange={(e) =>
                setSettings({ ...settings, facilityName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Area Size (m²)
            </label>
            <input
              type="number"
              className="w-full border rounded-lg p-2"
              placeholder="e.g., 250"
              value={settings.areaSize}
              onChange={(e) =>
                setSettings({ ...settings, areaSize: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Number of Rooms
            </label>
            <input
              type="number"
              className="w-full border rounded-lg p-2"
              placeholder="e.g., 8"
              value={settings.roomCount}
              onChange={(e) =>
                setSettings({ ...settings, roomCount: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Sensor Refresh Rate (seconds)
            </label>
            <input
              type="number"
              min="1"
              max="60"
              className="w-full border rounded-lg p-2"
              value={settings.refreshRate}
              onChange={(e) =>
                setSettings({ ...settings, refreshRate: e.target.value })
              }
            />
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4">Alert Thresholds</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              CO₂ Threshold (ppm)
            </label>
            <input
              type="number"
              className="w-full border rounded-lg p-2"
              value={settings.co2Threshold}
              onChange={(e) =>
                setSettings({ ...settings, co2Threshold: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              VOC Threshold (ppb)
            </label>
            <input
              type="number"
              className="w-full border rounded-lg p-2"
              value={settings.vocThreshold}
              onChange={(e) =>
                setSettings({ ...settings, vocThreshold: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Ideal Humidity Range (%)
            </label>
            <input
              type="text"
              className="w-full border rounded-lg p-2"
              placeholder="e.g., 40-60"
              value={settings.humidityRange}
              onChange={(e) =>
                setSettings({ ...settings, humidityRange: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Ideal Temperature Range (°C)
            </label>
            <input
              type="text"
              className="w-full border rounded-lg p-2"
              placeholder="e.g., 22-28"
              value={settings.temperatureRange}
              onChange={(e) =>
                setSettings({ ...settings, temperatureRange: e.target.value })
              }
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
