export default function AlertBanner({ level }) {
    if (level === "danger") {
      return (
        <div className="bg-red-600 text-white p-3 rounded mb-4">
          ⚠️ High CO₂ levels detected! Increasing fan speed...
        </div>
      );
    }
    return (
      <div className="bg-green-500 text-white p-3 rounded mb-4">
        Air quality is good.
      </div>
    );
  }
  