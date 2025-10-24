const API_BASE = "http://127.0.0.1:5050/api";

async function handleResponse(res) {
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

export async function getLiveReadings() {
  const res = await fetch(`${API_BASE}/live`);
  return handleResponse(res);
}

export async function getHistory() {
  const res = await fetch(`${API_BASE}/history`);
  return handleResponse(res);
}

export async function setFanSpeed(speed) {
  const res = await fetch(`${API_BASE}/purifier/fan`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ speed }),
  });
  return handleResponse(res);
}

export async function setAutoMode(auto) {
  const res = await fetch(`${API_BASE}/purifier/auto`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ auto }),
  });
  return handleResponse(res);
}
