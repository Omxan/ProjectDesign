const BASE_URL = import.meta.env.VITE_API_URL || "";

export async function getLiveReadings() {
  const res = await fetch(`${BASE_URL}/api/live`);
  return res.json();
}

export async function getHistory() {
  const res = await fetch(`${BASE_URL}/api/history`);
  return res.json();
}

export async function setFanSpeed(speed) {
  const res = await fetch(`${BASE_URL}/api/fan-speed`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ speed }),
  });
  return res.json();
}

export async function setAutoMode(isAuto) {
  const res = await fetch(`${BASE_URL}/api/auto-mode`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ auto: isAuto }),
  });
  return res.json();
}
