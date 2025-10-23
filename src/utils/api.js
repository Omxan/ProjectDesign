const BASE = import.meta.env.VITE_API_BASE || ""; // set to http://<PI_IP>:5000 later

const safeFetch = async (path) => {
  if (!BASE) throw new Error("No API base");
  const r = await fetch(`${BASE}${path}`);
  if (!r.ok) throw new Error("Bad response");
  return r.json();
};

// Mock helpers
const now = new Date();
const times = Array.from({ length: 28 }, (_, i) => {
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8 + Math.floor(i / 2), i % 2 ? 30 : 0);
  return d.toTimeString().slice(0, 5);
});
const todaySeriesMock = times.map((t, i) => ({
  time: t,
  actual: 410 + Math.round(20 * Math.sin(i / 4)) + (i % 3 === 0 ? 2 : 0),
}));
const weeklySeriesMock = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"].map((day, i) => ({
  day,
  actual: 440 + (i % 3) * 3,
}));
const weeklyBarMock = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => ({
  day: d,
  actual: 446 + (i % 2) * 3,
  predicted: 445 + (i % 3) * 2,
}));

export async function getLiveReadings() {
  try {
    return await safeFetch("/api/live");
  } catch {
    return {
      co2: 433,
      co2Pred: 449,
      threshold: 450,
      co: 1.2,
      vocs: 140,
      rh: 45,
      temp: 24.2,
      pm25: 8,
      occupancy: 6,
      purifier: { auto: true, speed: 2 },
    };
  }
}

export async function getTodaySeries() {
  try {
    return await safeFetch("/api/series/today");
  } catch {
    return todaySeriesMock;
  }
}

export async function getWeeklySeries() {
  try {
    return await safeFetch("/api/series/weekly");
  } catch {
    return weeklySeriesMock;
  }
}

export async function getWeeklyBar() {
  try {
    return await safeFetch("/api/series/weekly-bar");
  } catch {
    return weeklyBarMock;
  }
}

export async function setFanSpeed(speed) {
  try {
    if (!BASE) return;
    await fetch(`${BASE}/api/purifier/fan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ speed }),
    });
  } catch {}
}

export async function setAutoMode(auto) {
  try {
    if (!BASE) return;
    await fetch(`${BASE}/api/purifier/auto`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ auto }),
    });
  } catch {}
}
