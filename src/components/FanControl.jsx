import { useState } from "react";

export default function FanControl() {
  const [speed, setSpeed] = useState(2);

  return (
    <div className="bg-white p-6 shadow rounded w-1/2">
      <h2 className="text-xl font-semibold mb-4">Fan Speed Control</h2>
      <input
        type="range"
        min="1"
        max="5"
        value={speed}
        onChange={(e) => setSpeed(e.target.value)}
        className="w-full"
      />
      <p className="mt-2 text-center text-gray-700">
        Current Fan Speed: <span className="font-bold">{speed}</span>
      </p>
    </div>
  );
}
