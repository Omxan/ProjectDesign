export default function SensorCard({ label, value }) {
    return (
      <div className="bg-white shadow rounded-lg p-4 text-center">
        <h3 className="text-lg font-semibold">{label}</h3>
        <p className="text-2xl font-bold mt-2">{value}</p>
      </div>
    );
  }
  