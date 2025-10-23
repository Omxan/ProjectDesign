import SensorChart from "../components/SensorChart";

export default function History() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">History</h1>
      <p className="mb-4">Historical air quality data visualization.</p>
      <SensorChart />
    </div>
  );
}
